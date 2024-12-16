import { useState } from 'react'
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog'
import LoadingDots from '@/components/icons/loading-dots'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { extractErrorMessage } from '@/lib/extractErrorMessage'
import { api, trpc } from '@/lib/trpc'
import { ProviderType, UserRole } from '@/lib/types'
import { getAccountAddress, isAddress, shortenAddress } from '@/lib/utils'
import { Account, User } from '@/server/db/schema'
import { toast } from 'sonner'

function getAddressInAccounts(accounts: Account[]) {
  const find = accounts.find(
    (account) => account.providerType === ProviderType.WALLET,
  )
  return find?.providerAccountId || ''
}

interface Props {}

export default function ContributorList({}: Props) {
  const {
    isLoading,
    data: users = [],
    refetch,
  } = trpc.user.contributors.useQuery()

  return (
    <div className="flex flex-col">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left pl-0">User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right pr-0">Operations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                <LoadingDots className="bg-background/60" />
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            users?.map((user) => (
              <TableRow key={user.id} className="text-muted-foreground">
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.image!} />
                    <AvatarFallback>{user.name?.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">
                      {isAddress(user.name || '')
                        ? user?.name?.slice(0, 5)
                        : user.name}
                    </div>
                    <div className="text-sm text-foreground/60">
                      {user.email && <div>{user.email}</div>}
                      {getAddresses(user.accounts).map((address) => (
                        <div key={address}>{address}</div>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <SelectRole user={user} />
                </TableCell>
                <TableCell className="flex space-x-3 justify-end">
                  <DeleteConfirmDialog
                    title="Delete Confirmation"
                    content="Are you sure you want to delete this item? This action cannot be undone."
                    onConfirm={async () => {
                      await api.user.deleteContributor.mutate({
                        userId: user.id,
                      })
                      await refetch()
                      toast.success('Contributor deleted successfully!')
                    }}
                    tooltipContent={'Remove Contributor'}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

interface SelectRoleProps {
  user: User
}
function SelectRole({ user }: SelectRoleProps) {
  const [role, setRole] = useState(user.role)
  const { refetch } = trpc.user.contributors.useQuery()
  return (
    <Select
      value={role}
      onValueChange={async (value) => {
        setRole(value as UserRole)
        try {
          await api.user.updateContributor.mutate({
            userId: user.id,
            role: value as UserRole,
          })
          await refetch()

          toast.success('Contributor role updated successfully!')
        } catch (error) {
          toast.error(
            extractErrorMessage(error) || 'Failed to update contributor role!',
          )
        }
      }}
    >
      <SelectTrigger className="w-24">
        <SelectValue placeholder={role.toLowerCase()} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={UserRole.ADMIN}>
          {UserRole.ADMIN.toLowerCase()}
        </SelectItem>
        <SelectItem value={UserRole.AUTHOR}>
          {UserRole.AUTHOR.toLowerCase()}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

function getAddresses(accounts: Account[] = []) {
  return accounts
    .filter((account) => account.providerType === ProviderType.WALLET)
    .map((account) => account.providerAccountId)
}
