import { forwardRef } from 'react';
import { Drawer as DrawerPrimitive, Content as VaulDrawerContent } from 'vaul';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

import { useDialogDevice, useDialogBehavior } from './hooks';
import { useResponsiveDialog } from './provider';

// Pure UI Components without business logic

export const ResponsiveDialogTrigger = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) => {
  const { shouldUseDialog } = useDialogDevice();
  const ResponsiveDialogTrigger = shouldUseDialog ? DialogPrimitive.Trigger : DrawerPrimitive.Trigger;
  return <ResponsiveDialogTrigger {...props} />;
};
ResponsiveDialogTrigger.displayName = 'ResponsiveDialogTrigger';

export const ResponsiveDialogPortal = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) => {
  const { shouldUseDialog } = useDialogDevice();
  const ResponsiveDialogPortal = shouldUseDialog ? DialogPrimitive.Portal : DrawerPrimitive.Portal;
  return <ResponsiveDialogPortal {...props} />;
};
ResponsiveDialogPortal.displayName = 'ResponsiveDialogPortal';

export const ResponsiveDialogOverlay = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) => {
  const { shouldUseDialog } = useDialogDevice();
  const ResponsiveDialogOverlay = shouldUseDialog ? DialogPrimitive.Overlay : DrawerPrimitive.Overlay;
  return (
    <ResponsiveDialogOverlay
      {...props}
      className={cn(
        'fixed inset-0 z-50 bg-black/50 sm:data-[state=open]:animate-in sm:data-[state=closed]:animate-out sm:data-[state=closed]:fade-out-0 sm:data-[state=open]:fade-in-0',
        className
      )}
    />
  );
};
ResponsiveDialogOverlay.displayName = 'ResponsiveDialogOverlay';

export const ResponsiveDialogClose = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) => {
  const { shouldUseDialog } = useDialogDevice();
  const { shouldPreventClose } = useDialogBehavior();
  const ResponsiveDialogClose = shouldUseDialog ? DialogPrimitive.Close : DrawerPrimitive.Close;

  return (
    <ResponsiveDialogClose
      aria-label="Close"
      {...(shouldPreventClose && { onClick: (e: React.MouseEvent) => e.preventDefault() })}
      {...props}
    />
  );
};
ResponsiveDialogClose.displayName = 'ResponsiveDialogClose';

const ResponsiveDialogContentVariants = cva("fixed z-[9999] bg-background", {
  variants: {
    device: {
      desktop:
        "left-1/2 top-1/2 grid max-h-[calc(100%-4rem)] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:max-w-lg",
      mobile: "flex ",
    },
    direction: {
      bottom: '',
      top: '',
      left: '',
      right: '',
    },
  },
  defaultVariants: {
    device: 'desktop',
    direction: 'bottom',
  },
  compoundVariants: [
    {
      device: "mobile",
      direction: 'bottom',
      className:
        "inset-x-0 bottom-0 mt-24 h-fit max-h-[65%] flex-col rounded-t-[10px] border border-b-0 border-primary/10",
    },
    {
      device: 'mobile',
      direction: 'top',
      className:
        "inset-x-0 top-0 mb-24 h-fit max-h-[65%] flex-col rounded-b-[10px] border border-b-0 border-primary/10",
    },
    {
      device: 'mobile',
      direction: 'left',
      className:
        "bottom-2 left-2 top-2 flex w-[310px] bg-transparent outline-none [--initial-transform:calc(100%+8px)]",
    },
    {
      device: 'mobile',
      direction: 'right',
      className: "bottom-2 right-2 top-2 w-[310px] bg-transparent outline-none [--initial-transform:calc(100%+8px)]",
    },
  ],
});

export const ResponsiveDialogContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
    /** Styles for the built in close button */
    closeButtonClassName?: string;
    /** Styles for the drag handle */
    dragHandleClassName?: string;
  }
>(({ className, children, showCloseButton = true, closeButtonClassName, dragHandleClassName, ...props }, ref) => {
  const { shouldUseDialog } = useDialogDevice();
  const { direction } = useResponsiveDialog();
  const {
    shouldShowCloseButton: computedShowCloseButton,
    shouldPreventEscape,
    shouldPreventOutsideInteraction
  } = useDialogBehavior();

  const ResponsiveDialogContent = shouldUseDialog ? DialogPrimitive.Content : VaulDrawerContent;
  const shouldShowClose = computedShowCloseButton && showCloseButton;

  return (
    <ResponsiveDialogPortal>
      <ResponsiveDialogOverlay />
      <ResponsiveDialogContent
        ref={ref}
        {...props}
        {...(shouldPreventEscape && shouldUseDialog && { onEscapeKeyDown: (e: KeyboardEvent) => e.preventDefault() })}
        {...(shouldPreventOutsideInteraction &&
          shouldUseDialog && {
            onInteractOutside: (e: Event) => e.preventDefault(),
          })}
        {...(!shouldUseDialog &&
          shouldPreventOutsideInteraction && {
            onPointerDownOutside: (e: PointerEvent) => e.preventDefault(),
            onInteractOutside: (e: Event) => e.preventDefault(),
          })}
        className={cn(
          ResponsiveDialogContentVariants({
            device: shouldUseDialog ? 'desktop' : 'mobile',
            direction,
          }),
          className
        )}
      >
        {!shouldUseDialog && direction === 'bottom' && (
          <div
            className={cn(
              'mx-auto my-4 h-1.5 w-14 rounded-full bg-muted-foreground/25 pb-1.5 data-[vaul-handle]:h-1.5 data-[vaul-handle]:w-14 data-[vaul-handle]:pb-1.5 dark:bg-muted',
              dragHandleClassName
            )}
          />
        )}
        {children}
        {shouldShowClose && (
          <ResponsiveDialogClose
            className={cn(
              'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background backdrop-blur-sm transition-opacity hover:opacity-100 focus:outline-none focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-white',
              closeButtonClassName
            )}
          >
            <X className="size-4" />
            <span className="sr-only">close</span>
          </ResponsiveDialogClose>
        )}
      </ResponsiveDialogContent>
    </ResponsiveDialogPortal>
  );
});
ResponsiveDialogContent.displayName = 'ResponsiveDialogContent';

export const ResponsiveDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)} {...props} />;
};
ResponsiveDialogHeader.displayName = 'ResponsiveDialogHeader';

export const ResponsiveDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <footer className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />;
};
ResponsiveDialogFooter.displayName = 'ResponsiveDialogFooter';

export const ResponsiveDialogTitle = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  const { shouldUseDialog } = useDialogDevice();
  const ResponsiveDialogTitle = shouldUseDialog ? DialogPrimitive.Title : DrawerPrimitive.Title;
  return (
    <ResponsiveDialogTitle
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
});

ResponsiveDialogTitle.displayName = 'ResponsiveDialogTitle';

export const ResponsiveDialogDescription = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  const { shouldUseDialog } = useDialogDevice();
  const ResponsiveDialogDescription = shouldUseDialog ? DialogPrimitive.Description : DrawerPrimitive.Description;
  return (
    <ResponsiveDialogDescription ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  );
});

ResponsiveDialogDescription.displayName = 'ResponsiveDialogDescription';
