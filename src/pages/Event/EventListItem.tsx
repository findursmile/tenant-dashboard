import { useState } from 'react';
import axios from 'axios';
import { Cog8ToothIcon, EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu } from "../../components/catalyst/dropdown";
import { Link } from '../../components/catalyst/link';
import { EVENT, ImageInfo } from '../Events';
import { DeleteEvent } from './Delete';


export const EventListItem = ({ event, imagesInfo }: { event: EVENT; imagesInfo?: ImageInfo[]; }) => {
    const [promptDelete, setPromptDelete] = useState(false);
    const publishEvent = () => {
        axios.put(`/events/${event.id}/publish`).then(() => {
        });
    };

    const onDeletePromptClose = (status?: Boolean) => {
        setPromptDelete(false);
        if (status) {
            event.status = "deleted";
        }
    }

    return (
        <li>
            <div className="flex items-center justify-between">
                <div className="flex gap-6 py-6">
                    <div className="w-32 shrink-0">
                        <Link aria-hidden="true" data-headlessui-state="" href={`/events/${event?.id}`}>
                            <img
                                className="aspect-[3/2] rounded-lg shadow"
                                src={import.meta.env.VITE_API_BASE_URI + event?.cover_photo}
                                alt="" />
                        </Link>
                    </div>
                    <div className="space-y-1.5">
                        <div className="text-base/6 font-semibold">
                            <Link data-headlessui-state="" href={`/events/${event?.id}`}>
                                {event?.name}
                            </Link>
                        </div>
                        <div className="text-sm/4 text-zinc-500">
                            {event?.title}
                        </div>
                        <div className="flex justify-between text-xs/6">
                            {new Date(event.event_date).toLocaleDateString()}
                            <div>
                                &nbsp;{imagesInfo?.map((info, i) => (
                                    <>
                                        {!!i ? " | " : ""}
                                        <div key={i} className="text-xs/6 text-zinc-600 inline-block">{info.count} {info.status}</div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="max-sm:hidden inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15">
                        {event?.status}
                    </span>
                    <Dropdown>
                        <DropdownButton plain className="mb-2.5">
                            <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        </DropdownButton>
                        <DropdownMenu className="" anchor="bottom end">
                            <DropdownItem onClick={() => publishEvent()}>
                                <Cog8ToothIcon />
                                <DropdownLabel>Publish</DropdownLabel>
                            </DropdownItem>
                            {event.status != 'deleted' ? <DropdownItem onClick={() => setPromptDelete(true)}>
                                <TrashIcon />
                                <DropdownLabel>Delete</DropdownLabel>
                            </DropdownItem>: ''}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            {promptDelete ? <DeleteEvent event={event} onClose={onDeletePromptClose} /> : ''}
            <hr
                role="presentation"
                className="w-full border-t border-zinc-950/10 dark:border-white/10" />
        </li>
    );
};

