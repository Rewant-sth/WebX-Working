"use client"
import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/home/button'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react/dist/iconify.js'

// A polished floating contact button with an expandable panel
export default function AwesomeBtn() {
    const [open, setOpen] = React.useState(false)
    const panelRef = React.useRef<HTMLDivElement | null>(null)

    // Prefer the first expert's contact info, with safe fallbacks
    const rawPhone = '+9779851026840'
    const email = 'info@realhimalaya.com'
    const waNumber = rawPhone.replace(/[^\d]/g, '') // strip non-digits for wa.me link
    const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent('Hello Real Himalaya, I have a question about a trip.')}`
    const mailHref = `mailto:${email}?subject=${encodeURIComponent('Inquiry from Real Himalaya website')}`

    // Close on ESC
    React.useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open])

    // Close when clicking outside of the panel
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!panelRef.current) return
        if (!panelRef.current.contains(e.target as Node)) {
            setOpen(false)
        }
    }

    return (
        <div className='fixed inset-0 z-[999] p-4 sm:p-6 lg:p-8 flex justify-end items-end pointer-events-none'>
            {/* Click-capture overlay when open */}
            {open && (
                <div
                    className="absolute inset-0 pointer-events-auto"
                    aria-hidden="true"
                    onClick={handleOutsideClick}
                />
            )}

            {/* Container for FAB and panel */}
            <div className='relative pointer-events-none'>
                {/* Expandable panel */}
                <div
                    role="dialog"
                    aria-modal="false"
                    aria-label="Contact Real Himalaya"
                    ref={panelRef}
                    className={cn(
                        'pointer-events-auto absolute bottom-16 right-0 w-[min(92vw,22rem)] origin-bottom-right',
                        'rounded-xl bg-white/95 backdrop-blur shadow-xl ring-1 ring-black/5',
                        'p-4 sm:p-5 transition-all motion-safe:duration-200',
                        open
                            ? 'opacity-100 translate-y-0 scale-100'
                            : 'pointer-events-none opacity-0 translate-y-2 scale-95'
                    )}
                >
                    <div className='flex items-start gap-3'>
                        <div className='flex-1'>
                            <h2 className='text-base sm:text-lg font-semibold text-zinc-900'>
                                Need help planning your trip?
                            </h2>
                            <p className='mt-1 text-xs sm:text-sm text-zinc-600'>
                                Our team is online to answer questions on WhatsApp or email.
                            </p>
                        </div>
                        <button
                            type='button'
                            onClick={() => setOpen(false)}
                            className='inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                            aria-label='Close contact panel'
                        >
                            <X className='h-4 w-4' />
                        </button>
                    </div>

                    <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        <a
                            href={waHref}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='no-underline'
                        >
                            <Button
                                className='w-full font-medium text-white hover:brightness-90'
                                style={{ backgroundColor: '#25D366' }}
                            >
                                <Icon icon={"ri:whatsapp-fill"} className='mr-2 h-4 w-4' /> WhatsApp
                            </Button>
                        </a>

                        <a href={mailHref} className='no-underline'>
                            <Button variant='outline' className='w-full font-medium hover:border-[#FF6900] hover:text-[#FF6900]'>
                                <Icon icon={"mdi:gmail"} className='mr-2 h-4 w-4' /> Email us
                            </Button>
                        </a>
                    </div>

                    <div className='mt-3 text-[11px] sm:text-xs text-zinc-500'>
                        Typically responds within a few minutes
                    </div>
                </div>

                {/* Floating Action Button */}
                <button
                    type='button'
                    aria-haspopup='dialog'
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    className={cn(
                        'pointer-events-auto relative flex items-center justify-center',
                        'h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg focus:outline-none',
                        'bg-[#FF6900] text-white transition-transform motion-safe:duration-200 hover:scale-105 active:scale-95'
                    )}
                >
                    {/* Notification badge */}
                    <span
                        className='absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-white bg-white text-[10px] font-semibold text-[#FF6900] shadow-sm'
                    >
                        1
                    </span>
                    {/* Chat icon */}
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        className='h-7 w-7 sm:h-8 sm:w-8'
                        aria-hidden='true'
                    >
                        <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}>
                            <path d='M25 5H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h11l6 4v-4h1a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4'></path>
                            <path d='M10 15a1 1 0 1 1-2 0a1 1 0 0 1 2 0m6 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0m6 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0'></path>
                        </g>
                    </svg>
                    <span className='sr-only'>Open contact options</span>
                </button>
            </div>
        </div>
    )
}
