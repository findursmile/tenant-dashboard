import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import DefaultLayout from "../layout/DefaultLayout";
import { API_HOSTNAME } from "../common/axios";
import { EVENT } from "./Events";
import { Link } from "../components/catalyst/link";
import { Cog8ToothIcon, EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu } from "../components/catalyst/dropdown";

export interface ImageInfo {
    count: number,
        status: string,
}

export default function EventDetails() {
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState<EVENT|null>(null);
    const [imagesInfo, setImagesInfo] = useState<ImageInfo[]>([]);
    const {eventId} = useParams();

    const getEvent = () => {
        axios.get(`/events/${eventId}`).then(res => {
            setEvent(res.data.event)
            res.data.images_info && setImagesInfo(res.data.images_info);
            setLoading(false);
        })
    }

    const publishEvent = () => {
        setLoading(true);
        axios.put(`/events/${eventId}/publish`).then(() => {
            setLoading(false);
        })
    }

    const searchImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) {
            return;
        }
        setLoading(true);
        const frmData = new FormData();
        [...e.target.files].forEach(fileBlob => frmData.append('images[]', fileBlob));
        axios.post(`/events/${eventId}/images`, frmData).then(_ => {
            setLoading(false);
        });
    }

    useEffect(() => {
        if (!eventId) {
            return
        }
        getEvent()
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
                                            <Link data-headlessui-state="" href={`/events/${event?.id}`}>
                                                {event?.name}
                                            </Link>
                                        </div>
                                        <div className="text-xs/6 text-zinc-500">
                                            {event?.event_date} <span aria-hidden="true">·</span> {event?.title}
                                        </div>
                                        {imagesInfo.map((info, i) => (
                                            <>
                                                {!!i ? " | " : ""}
                                                <div key={i} className="text-xs/6 text-zinc-600 inline-block">{info.count} {info.status}</div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="max-sm:hidden inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">
                                        {event?.status}
                                    </span>
            <Dropdown>
                <DropdownButton className="mb-2.5">
                    <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                </DropdownButton>
                <DropdownMenu className="" anchor="bottom end">
                    <DropdownItem onClick={() => publishEvent()}>
                        <Cog8ToothIcon />
                        <DropdownLabel>Publish</DropdownLabel>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
                                </div>
        </div>
        <hr
            role="presentation"
            className="w-full border-t border-zinc-950/10 dark:border-white/10"
        />
        </li>
        </ul>
        <div
            onClick={() => {
                document.getElementById("file-upload")?.click()
            }}
            className="flex justify-center rounded-lg border border-dashed border-gray-900/25 hover:border-gray-500 cursor-pointer px-6 py-10 my-5 hover:text-zinc-600 dark:hover:text-white">
            <div className="mt-4 text-center text-sm leading-6 ">
                <label
                    htmlFor="file-upload"
                    className="relative inline-block cursor-pointer rounded-md bg-white dark:bg-transparent font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                    <span>Upload a file</span>
                    <input multiple onChange={searchImage} id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">Drag and Drop JPG files up to 10MB</p>
            </div>
        </div>

        {event && <Images event={event} />}

        </div>
        </div>
        </DefaultLayout>
    )
}


export const Images = ({event}) => {
    const [files, setFiles] = useState<{image_uri: string}[]>([]);

    const getImages = () => {
        axios.get(`/events/${event.id}/images`).then(res => {
            setFiles(res.data.images);
            // setLoading(false);
        })
    }

    useEffect(() => {
        getImages();
    }, []);

    return (
        <>
        <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-sm:w-full sm:flex-1">
                <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
                    Images
                </h1>
            </div>
        </div>

        {files.length === 0 ? <div> No images found</div> : ''}

        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {files.map((file, i) => (
                <li key={i} className="relative">
                    <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <img src={API_HOSTNAME + file.image_uri} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                        <button type="button" className="absolute inset-0 focus:outline-none">
                            <span className="sr-only">View details for {file.image_uri}</span>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
        </>
    );
}
