import { useTranslation } from '@pancakeswap/localization'
import {
  Balance,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Flex,
  Heading,
  Image,
  Message,
  MessageText,
  Text,
  useModal,
  useToast,
  VoteIcon,
} from '@pancakeswap/uikit'
import { BigNumber } from 'bignumber.js'
import ConnectWalletButton from 'components/ConnectWalletButton'
import fromPairs from 'lodash/fromPairs'
import { useEffect, useMemo, useState } from 'react'
import { Proposal, ProposalState, ProposalTypeName, Vote } from 'state/types'
import { VECAKE_VOTING_POWER_BLOCK } from 'views/Voting/helpers'
import useGetVotingPower from 'views/Voting/hooks/useGetVotingPower'
import { SingleVote } from 'views/Voting/Proposal/VoteType/SingleVote'
import { SingleVoteState, VoteState, WeightedVoteState } from 'views/Voting/Proposal/VoteType/types'
import { WeightedVote } from 'views/Voting/Proposal/VoteType/WeightedVote'
import { useAccount } from 'wagmi'
import CastVoteModal from '../components/CastVoteModal'

interface VoteProps extends CardProps {
  proposal: Proposal
  votes: Vote[]
  hasAccountVoted: boolean
  onSuccess?: () => void
}

const VoteComponent: React.FC<React.PropsWithChildren<VoteProps>> = ({
  proposal,
  votes,
  hasAccountVoted,
  onSuccess,
  ...props
}) => {
  const [vote, setVote] = useState<VoteState>({
    label: '',
    value: 0,
  })
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { address: account } = useAccount()
  const { total } = useGetVotingPower(Number(proposal.snapshot))

  useEffect(() => {
    const { type, choices } = proposal
    if (type === ProposalTypeName.WEIGHTED && account) {
      let newData: null | WeightedVoteState = null
      const voteData = votes.find((i) => i.voter.toLowerCase() === account.toLowerCase())
      const pairs = choices.map((_, index) => [index + 1, voteData?.choice[index + 1] ?? 0])
      newData = fromPairs(pairs)

      if (newData) {
        setVote(newData)
      }
    }
  }, [account, proposal, votes])

  const handleSuccess = async () => {
    toastSuccess(t('Vote cast!'))
    onSuccess?.()
  }

  const [presentCastVoteModal] = useModal(
    <CastVoteModal
      proposal={proposal}
      proposalId={proposal.id}
      voteType={proposal.type}
      vote={vote}
      block={Number(proposal.snapshot)}
      onSuccess={handleSuccess}
    />,
  )

  const isVeCakeVersion = useMemo(
    () => proposal.snapshot && BigInt(proposal.snapshot) >= VECAKE_VOTING_POWER_BLOCK,
    [proposal],
  )

  const notEnoughVeCake = useMemo(() => {
    if (isVeCakeVersion) {
      return total === undefined || new BigNumber(total).lte(0)
    }

    return false
  }, [isVeCakeVersion, total])

  const isAbleToVote = useMemo(() => {
    if (proposal.type === ProposalTypeName.SINGLE_CHOICE) {
      return (vote as SingleVoteState).value > 0
    }

    // ProposalTypeName.WEIGHTED
    const totalVote = Object.values(vote).reduce((acc, value) => acc + value, 0)
    return totalVote > 0
  }, [proposal, vote])

  return (
    <Card {...props}>
      <CardHeader style={{ background: 'transparent' }}>
        <Flex flexDirection={['column', 'column', 'row']}>
          <Heading as="h3" scale="md" mr="auto">
            {t('Cast your vote')}
          </Heading>
          {account && isVeCakeVersion && (
            <Flex alignItems="center">
              <Text color={notEnoughVeCake ? 'failure' : 'text'}>{t('veCake Balance')}:</Text>
              <Balance
                bold
                fontSize="20px"
                m="0 4px 0 8px"
                lineHeight="110%"
                decimals={2}
                color={notEnoughVeCake ? 'failure' : 'text'}
                value={total}
              />
              <Image
                width={32}
                height={32}
                style={{ minWidth: '32px' }}
                src={
                  notEnoughVeCake
                    ? '/images/cake-staking/not-enough-veCAKE.png'
                    : '/images/cake-staking/token-vecake.png'
                }
              />
            </Flex>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        {proposal.type === ProposalTypeName.SINGLE_CHOICE && (
          <SingleVote proposal={proposal} vote={vote as SingleVoteState} setVote={setVote} />
        )}
        {proposal.type === ProposalTypeName.WEIGHTED && (
          <WeightedVote
            proposal={proposal}
            hasAccountVoted={hasAccountVoted}
            notEnoughVeCake={notEnoughVeCake}
            vote={vote as WeightedVoteState}
            setVote={setVote}
          />
        )}
        {account ? (
          <>
            {proposal.state === ProposalState.ACTIVE && (
              <>
                {hasAccountVoted ? (
                  <Message variant="success" style={{ width: 'fit-content', margin: 'auto' }}>
                    <MessageText>
                      {t('You cast your vote! Please wait until the voting ends to see the end results.')}
                    </MessageText>
                  </Message>
                ) : notEnoughVeCake ? (
                  <Button m="auto" display="block" disabled>
                    {t('Not enough veCAKE')}
                  </Button>
                ) : !isAbleToVote ? (
                  <Button m="auto" display="block" disabled>
                    {t('Enter the votes to cast')}
                  </Button>
                ) : (
                  <Button
                    m="auto"
                    display="block"
                    endIcon={<VoteIcon width={14} height={14} color="currentColor" />}
                    onClick={presentCastVoteModal}
                  >
                    {t('Cast Vote')}
                  </Button>
                )}
              </>
            )}
          </>
        ) : (
          <ConnectWalletButton m="auto" display="block" />
        )}
      </CardBody>
    </Card>
  )
}

export default VoteComponent
