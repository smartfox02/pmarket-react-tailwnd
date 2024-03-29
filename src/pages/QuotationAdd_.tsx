import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '../components/Breadcrumb.js';
import { isEmpty } from '../config/index.js';
import { newQuotation, setRedirect } from '../store/slice/quotationSlice.js';
import { AddressSVG, CheckSVG, EmailSVG, HumanSVG, InvoiceSVG, PhoneSVG, TitleSVG, WebSVG } from '../components/SVG.js';
import ClientModal from './ClientModal.js';

const QuotationAdd = () => {

  const [to_name, setName] = useState('');
  const [to_email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [invoice_id, setInvoice] = useState('');
  const [mail_content, setContent] = useState('');

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errors = useSelector((state) => state.quotation.errors);
  const redirect = useSelector((state) => state.quotation.redirect);

  const titleList = ['Mr', 'Mrs', 'Ms', 'Dr'];

  useEffect(() => {
    if (redirect) {
      dispatch(setRedirect(false));
      navigate('/member/quotation');
    }
  }, [redirect])

  const handleSubmit = (event: any) => {

    event.preventDefault();
    const data = {
      to_name,
      to_email,
      subject,
      invoice_id,
      mail_content
    }
    console.log(data);
    dispatch(newQuotation(data));
  }

  const handleClose = (event: any) => {
    event.preventDefault();
    navigate('/member/quotation');
  }

  const handleSelect = (user) => {
    setName((isEmpty(user.title) ? '' : (titleList[user.title] + '. ')) + user.name)
    setEmail(user.email)
  }

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Quotation" />
        <ClientModal open={open} setOpen={setOpen} handleSelect={handleSelect} />

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-12 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  New Quotation
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>

                  <div className='mb-5.5'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white flex"
                      htmlFor="delivery"
                    >
                      To
                      <span
                        style={{
                          marginLeft: 'auto',
                          marginRight: '5px',
                          color: 'rgb(60, 80, 224)',
                          cursor: 'pointer'
                        }}
                        className='rounded border px-3'
                        onClick={e => { e.preventDefault(); setOpen(true) }}
                      >
                        From here
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <HumanSVG />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="delivery"
                        id="delivery"
                        value={to_name}
                        onChange={e => { e.preventDefault(); setName(e.target.value) }}
                        placeholder="Write client name here"
                      />
                    </div>
                    <label
                      className="mb-0 block text-sm font-medium mt-2 text-danger"
                      htmlFor="to_name"
                    >
                      {isEmpty(errors) ? '' : errors.to_name}
                    </label>
                  </div>

                  <div className='mb-5.5'>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <EmailSVG />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="delivery"
                        id="delivery"
                        value={to_email}
                        onChange={e => { e.preventDefault(); setEmail(e.target.value) }}
                        placeholder="Write client email here"
                      />
                    </div>
                    <label
                      className="mb-0 block text-sm font-medium mt-2 text-danger"
                      htmlFor="to_email"
                    >
                      {isEmpty(errors) ? '' : errors.to_email}
                    </label>
                  </div>

                  <div className='mb-5.5'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="delivery"
                    >
                      Subject
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <WebSVG />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="delivery"
                        id="delivery"
                        value={subject}
                        onChange={e => { e.preventDefault(); setSubject(e.target.value) }}
                        placeholder="Write subject here"
                      />
                    </div>
                    <label
                      className="mb-0 block text-sm font-medium mt-2 text-danger"
                      htmlFor="website"
                    >
                      {isEmpty(errors) ? '' : errors.subject}
                    </label>
                  </div>

                  <div className='mb-5.5'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="delivery"
                    >
                      Invoice number
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <InvoiceSVG />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="delivery"
                        id="delivery"
                        value={invoice_id}
                        onChange={e => { e.preventDefault(); setInvoice(e.target.value) }}
                        placeholder="Write invoice number here"
                      />
                    </div>
                    <label
                      className="mb-0 block text-sm font-medium mt-2 text-danger"
                      htmlFor="invoice_id"
                    >
                      {isEmpty(errors) ? '' : errors.invoice}
                    </label>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Content
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        value={mail_content}
                        onChange={e => { e.preventDefault(); setContent(e.target.value) }}
                        rows={6}
                        placeholder="Write mail content here"
                      ></textarea>
                    </div>
                    <label
                      className="mb-0 block text-sm font-medium mt-2 text-danger"
                      htmlFor="remark"
                    >
                      {isEmpty(errors) ? '' : errors.mail_content}
                    </label>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div >
          </div >
        </div >
      </div >
    </>
  );
};

export default QuotationAdd;