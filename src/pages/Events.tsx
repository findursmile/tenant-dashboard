import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { Avatar } from '../components/catalyst/avatar'
import { Badge } from '../components/catalyst/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/catalyst/table'
import moment from 'moment';

interface EVENT {
    id: string,
    title: string,
    name: string,
    cover_photo: string,
    status: string,
    event_date: string,
    event_end_at: string,
}

const Events = () => {
    const [events, setEvents] = useState<EVENT[]>([]);

    useEffect(() => {
        axios.get('events').then(res => {
            setEvents(res.data.events);
            document.querySelector('.animate-pulse')?.classList.remove('animate-pulse');
        });
    }, []);

    return (
        <DefaultLayout>
            <div className="animate-pulse">
                <Breadcrumb pageName="Events" />

                <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                <TableHead>
                    <TableRow>
                        <TableHeader>Event</TableHeader>
                        <TableHeader>Date</TableHeader>
                        <TableHeader>End Date</TableHeader>
                        <TableHeader>Status</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                          <TableCell>
                              <div className="flex items-center gap-4">
                                  <Avatar src="https://st.depositphotos.com/1000128/4721/i/450/depositphotos_47218435-stock-photo-happy-yellow-smileys.jpg" className="size-12" />
                                  <div>
                                      <div className="font-medium">{event.name}</div>
                                      <div className="text-zinc-500">
                                          <a href="#" className="hover:text-zinc-700">
                                              {event.title}
                                          </a>
                                      </div>
                                  </div>
                              </div>
                          </TableCell>
                          <TableCell className="text-zinc-500">{moment(event.event_date).format('LL')}</TableCell>
                          <TableCell className="text-zinc-500">{moment(event.event_end_at).format('LL')}</TableCell>
                          <TableCell>
                              {event.status === 'draft' && <Badge color="lime">Draft</Badge>}
                              {event.status === 'pending' && <Badge color="orange">Pending</Badge>}
                              {event.status === 'completed' && <Badge color="green">Completed</Badge>}
                          </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
        </DefaultLayout>
    );
};

export default Events;
