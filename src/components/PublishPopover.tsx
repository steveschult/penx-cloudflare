'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { usePost } from '@/hooks/usePost'
import { usePublishPost } from '@/hooks/usePublishPost'
import { IObjectNode, Node } from '@/lib/model'
import { GateType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { store } from '@/store'
import { PopoverClose } from '@radix-ui/react-popover'
import { useParams, usePathname } from 'next/navigation'
import LoadingDots from './icons/loading-dots'
import { useSiteContext } from './SiteContext'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Switch } from './ui/switch'

interface Props {
  className?: string
}

export function PublishPopover({ className }: Props) {
  const [isOpen, setOpen] = useState(false)

  return (
    <Popover
      open={isOpen}
      onOpenChange={(v) => {
        setOpen(v)
      }}
    >
      <PopoverTrigger asChild>
        <Button
          className={cn('w-24', className)}
          onClick={() => {
            setOpen(true)
          }}
        >
          Publish
        </Button>
      </PopoverTrigger>
      <PublishPopoverContent setOpen={setOpen} />
    </Popover>
  )
}

interface PublishPopoverContentProps {
  setOpen: Dispatch<SetStateAction<boolean>>
}

function PublishPopoverContent({ setOpen }: PublishPopoverContentProps) {
  const { post } = usePost()
  const { spaceId } = useSiteContext()
  const { nodeId } = useParams()!
  const pathname = usePathname()

  const [gateType, setGateType] = useState<GateType>(GateType.FREE)
  const [collectible, setCollectible] = useState(post?.collectible || false)
  const { isLoading, publishPost } = usePublishPost()

  if (!post) return null

  return (
    <PopoverContent align="end" className="w-[360px] flex flex-col gap-5">
      <div className="text-center text-xl font-semibold">Publish your post</div>

      <div>
        <div className="font-semibold">Access control</div>
        <div className="text-sm leading-tight">
          Gate this post, config who can read this post.
        </div>
      </div>

      <GateTypeSelect
        value={gateType}
        onSelect={(value) => {
          setGateType(value)
        }}
      />
      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="post-collectible">Collectible</Label>
          <Switch
            id="post-collectible"
            checked={collectible}
            disabled={!spaceId}
            onCheckedChange={(value) => {
              setCollectible(value)
            }}
          />
        </div>
        <div className="text-foreground/60 text-xs">
          Bind a space ID to enable collection.
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        <PopoverClose asChild>
          <Button variant="secondary" className="w-full">
            Cancel
          </Button>
        </PopoverClose>
        <Button
          className="w-full"
          onClick={async () => {
            await publishPost(null as any, gateType, collectible)
            // updatePostPublishStatus()
            setOpen(false)
          }}
        >
          {isLoading ? <LoadingDots /> : <div>Publish</div>}
        </Button>
      </div>
    </PopoverContent>
  )
}

interface GateTypeSelectProps {
  value: GateType
  onSelect: (value: GateType) => void
}

function GateTypeSelect({ value, onSelect }: GateTypeSelectProps) {
  return (
    <div className="flex gap-2">
      <GateTypeItem
        selected={value === GateType.FREE}
        title="Free"
        description="Any one can read this post"
        onClick={() => onSelect(GateType.FREE)}
      />
      <GateTypeItem
        selected={value === GateType.PAID}
        title="Paid"
        description="Member or collector can read this post"
        onClick={() => onSelect(GateType.PAID)}
      />
    </div>
  )
}

interface GateItemTypeProps {
  selected?: boolean
  title: string
  description: string
  onClick: () => void
}

function GateTypeItem({
  selected,
  title,
  description,
  onClick,
}: GateItemTypeProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 p-3 flex-1 cursor-pointer',
        selected ? 'border-primary' : 'border-secondary',
      )}
      onClick={() => onClick?.()}
    >
      <div className="font-medium text-base">{title}</div>
      <div className="text-xs text-foreground/60">{description}</div>
    </div>
  )
}
