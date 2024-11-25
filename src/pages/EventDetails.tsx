import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import DefaultLayout from "../layout/DefaultLayout";
import { EVENT, EventListItem, ImageInfo } from "./Events";
import { Link } from "../components/catalyst/link";

export default function EventDetails() {
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState<EVENT|null>(null);
    const [imagesInfo, setImagesInfo] = useState<ImageInfo[]>([]);
    const [imagesKey, setImagesKey] = useState(0);
    const {eventId} = useParams();

    const getEvent = () => {
        axios.get(`/events/${eventId}`).then(res => {
            setEvent(res.data.event)
            res.data.images_info && setImagesInfo(res.data.images_info);
            setLoading(false);
        })
    }

    const addImages = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) {
            return;
        }
        setLoading(true);
        const frmData = new FormData();
        [...e.target.files].forEach(fileBlob => frmData.append('images[]', fileBlob));
        axios.post(`/events/${eventId}/images`, frmData).then(_ => {
            setLoading(false);
            setImagesKey(imagesKey + 1);
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
                        {event && <EventListItem event={event} imagesInfo={imagesInfo} />}
                    </ul>
        <div
            className="flex justify-center rounded-lg border border-dashed border-gray-900/25 hover:border-gray-500 cursor-pointer px-6 py-10 my-5 hover:text-zinc-600 dark:hover:text-white">
            <div className="mt-4 text-center text-sm leading-6 ">
                <label
                    htmlFor="file-upload"
                    className="relative inline-block cursor-pointer rounded-md bg-white dark:bg-transparent font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                    <span>Upload a file</span>
                </label>
                <p className="pl-1">Drag and Drop JPG files up to 10MB</p>
            </div>
        </div>
        <input multiple onChange={addImages} id="file-upload" name="file-upload" type="file" className="sr-only" />

        {event && <Images event={event} key={imagesKey} />}

        </div>
        </div>
        </DefaultLayout>
    )
}


export const Images = ({event}: {event: EVENT}) => {
    const [files, setFiles] = useState<{image_uri: string}[]>([]);
    const [hasMoreImages, setHasMoreImages] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const limit = 25;

    const getImages = () => {
        axios.get(`/events/${event.id}/images`, {
            params: {page: pageNo}
        }).then(res => {
            if (res.data.images.length) {
                setFiles(files.concat(res.data.images));
            }

            if (res.data.images.length < limit) {
                setHasMoreImages(false);
            }
        })
    }

    useEffect(() => {
        getImages();
    }, [pageNo]);

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
                        <img src={import.meta.env.VITE_IMAGE_BASE_URI + file.image_uri} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                        <button type="button" className="absolute inset-0 focus:outline-none">
                            <span className="sr-only">View details for {file.image_uri}</span>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
        {hasMoreImages && <div className="flex justify-center pb-2" >
            <button className="" onClick={() => setPageNo(pageNo + 1)}> Load More</button>
        </div>}
        </>
    );
}
