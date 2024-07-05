import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';

const AddEvent = () => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [eventDate, setEventDate] = useState(new Date().toLocaleDateString());
    const [eventEndAt, setEventEndAt] = useState(new Date().toLocaleDateString());
    const navigate = useNavigate();

    const creatEvent = (e) => {
        e.preventDefault();
        const event = {
            name,
            title,
            event_date: eventDate,
            event_end_at: eventEndAt,
        };

        axios.post('/events', event).then(() => {
            navigate('/events')
        });
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Events" />

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Sign In Form
              </h3>
            </div>
            <form action="#" onSubmit={creatEvent}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                      Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the Name of your Event"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                      Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the Title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={e => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                      Event Date
                  </label>
                  <input
                    type="date"
                    placeholder="Event Date"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={e => setEventDate(e.target.value)}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                      Event End Date
                  </label>
                  <input
                    type="date"
                    placeholder="Event End Date"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={e => setEventEndAt(e.target.value)}
                  />
                </div>


                <button className="mt-5 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Create
                </button>
              </div>
            </form>
          </div>
        </DefaultLayout>
    );
};

export default AddEvent;

