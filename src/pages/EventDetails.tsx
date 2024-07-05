import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import DefaultLayout from "../layout/DefaultLayout";
import { API_HOSTNAME } from "../common/axios";
import { EVENT } from "./Events";
import { Link } from "../components/catalyst/link";

export default function EventDetails() {
    const [files, setFiles] = useState<{image_uri: string}[]>([]);
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState<EVENT|null>(null);
    const {eventId} = useParams();

    const getImages = () => {
        axios.get(`../events/${eventId}/images`).then(res => {
            setFiles(res.data.images);
            setLoading(false);
        })
    }

    const getEvent = () => {
        axios.get(`/events/${eventId}`).then(res => {
            setEvent(res.data.event)
            setLoading(false);
        })
    }

    const searchImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) {
            return;
        }
        setLoading(true);
        const frmData = new FormData();
        frmData.append('file', e.target.files[0]);
        fetch(`http://localhost:8989/events/${eventId}/images`, {
            method: 'POST',
            body: frmData
        }).then(res => {
            setLoading(false);
            res.json().then(f => setFiles(f));
        });
    }

    useEffect(() => {
        getEvent()
        getImages()

    }, []);

    return (
        <DefaultLayout>
            <div className={`${loading ? 'animate-pulse' : ''}`}>
                <div className="mx-auto max-w-6xl">
                    <div className="max-lg:hidden">
                        <Link
                            className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
                            data-headlessui-state=""
                            href="/events"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                                className="size-4 fill-zinc-400 dark:fill-zinc-500"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Events
                        </Link>
                    </div>

                    <ul className="mb-10" >
                        <li >
                            <div className="flex items-center justify-between">
                                <div className="flex gap-6 py-6">
                                    <div className="w-32 shrink-0">
                                        <Link aria-hidden="true" data-headlessui-state="" href={`/events/${event?.id}`}>
                                            <img
                                                className="aspect-[3/2] rounded-lg shadow"
                                                src={API_HOSTNAME + event?.cover_photo}
                                                alt=""
                                            />
                                        </Link>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="text-base/6 font-semibold">
                                            <Link data-headlessui-state="" to={`/events/${event?.id}`}>
                                                {event?.name}
                                            </Link>
                                        </div>
                                        <div className="text-xs/6 text-zinc-500">
                                            {event?.event_date} <span aria-hidden="true">·</span> {event?.title}
                                        </div>
                                        <div className="text-xs/6 text-zinc-600">350/500 tickets sold</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="max-sm:hidden inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">
                                        {event?.status}
                                    </span>
                                    <button
                                        aria-label="More options"
                                        id="headlessui-menu-button-:r1p:"
                                        type="button"
                                        aria-haspopup="menu"
                                        aria-expanded="false"
                                        data-headlessui-state=""
                                        className="relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[disabled]:opacity-50 [&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent text-zinc-950 data-[active]:bg-zinc-950/5 data-[hover]:bg-zinc-950/5 dark:text-white dark:data-[active]:bg-white/10 dark:data-[hover]:bg-white/10 [--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hover]:[--btn-icon:theme(colors.zinc.700)] dark:[--btn-icon:theme(colors.zinc.500)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)] cursor-default"
                                    >
                                        <span
                                            className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
                                            aria-hidden="true"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            data-slot="icon"
                                        >
                                            <path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <hr
                                role="presentation"
                                className="w-full border-t border-zinc-950/10 dark:border-white/10"
                            />
                        </li>
                    </ul>
                    <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 my-5">
                        <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white dark:bg-transparent font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input onChange={searchImage} id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div className="max-sm:w-full sm:flex-1">
                            <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
                                Images
                            </h1>
                        </div>
                    </div>

                    {files.length === 0 ? <div> No images found</div> : ''}

                    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {files.map((file) => (
                            <li key={file.image_uri} className="relative">
                                <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                    <img src={API_HOSTNAME + file.image_uri} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                                    <button type="button" className="absolute inset-0 focus:outline-none">
                                        <span className="sr-only">View details for {file.image_uri}</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </DefaultLayout>
    )
}

