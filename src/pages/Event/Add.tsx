import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios, { HttpStatusCode } from 'axios';
import flatpickr from 'flatpickr';

const AddEvent = () => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [eventDate, setEventDate] = useState(new Date().toLocaleDateString());
    const navigate = useNavigate();

    const creatEvent = e => {
        e.preventDefault();
        const event = {
            name,
            title,
            event_date: eventDate,
        };

        axios.post('/events', event).then(res => {
            res.status == HttpStatusCode.Ok && navigate('/events')
        });
    }

    useEffect(() => {
        flatpickr('.event-date-input', {
            mode: 'single',
            static: true,
            monthSelectorType: 'static',
            dateFormat: 'Y-m-d',
            onChange:(_, dateStr) => {
                setEventDate(dateStr)
              },
            prevArrow:
            '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
            nextArrow:
            '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        });
    });

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Event" />

          <div className="w-96 rounded-sm dark:bg-boxdark">
            <form action="#" onSubmit={creatEvent}>
              <div className="">
                <div className="mb-4.5">
                  <label className="mb-1.5 block text-black dark:text-white">
                      Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the Name of your Event"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-1.5 block text-black dark:text-white">
                      Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the Title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={e => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-1.5 block text-black dark:text-white">
                      Event Date
                  </label>
                  <input
                    type="text"
                    placeholder="Event Date"
                    className="event-date-input w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={e => {
                          console.log(e.target.value);
                          setEventDate(e.target.value)
                      }}
                  />
                </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                  Create
              </button>
            </div>
              </div>
            </form>
          </div>
        </DefaultLayout>
    );
};

export default AddEvent;
