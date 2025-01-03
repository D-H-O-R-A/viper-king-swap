import { useTranslation } from '@pancakeswap/localization'
import { Skeleton, UserMenuItem } from '@pancakeswap/uikit'
import NextLink from 'next/link'
import { styled } from 'styled-components'

interface ProfileUserMenuItemProps {
  isLoading: boolean
  hasProfile: boolean
  disabled: boolean
}

const Dot = styled.div`
  background-color: ${({ theme }) => theme.colors.failure};
  border-radius: 50%;
  height: 8px;
  width: 8px;
`

const ProfileUserMenuItem: React.FC<React.PropsWithChildren<ProfileUserMenuItemProps>> = ({
  isLoading,
  hasProfile,
  disabled,
}) => {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <UserMenuItem>
        <Skeleton height="24px" width="35%" />
      </UserMenuItem>
    )
  }


  return (
    <NextLink href="/profile" passHref>
      <UserMenuItem disabled={disabled}>{t('Your Profile')}</UserMenuItem>
    </NextLink>
  )
}

export default ProfileUserMenuItem
