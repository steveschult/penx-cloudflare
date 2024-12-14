import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useSwitchChainDialog } from './useSwitchChainDialog'

export function SwitchChainDialog() {
  const { isOpen, setIsOpen } = useSwitchChainDialog()
  const preventClose = (e: any) => {
    e.preventDefault()
  }
  return (
    <Dialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
      <DialogTrigger asChild>
        <div className="hover:bg-sidebar h-6 w-6 rounded-md flex items-center justify-center cursor-pointer">
          <Plus className="text-primary" size={16} />
        </div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={preventClose}
        onInteractOutside={preventClose}
      >
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
