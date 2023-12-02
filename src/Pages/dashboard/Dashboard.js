
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCodeCompare, faDisplay, faHouse, faListCheck, faPaste, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
// import { ProjectUrl } from '../../Utils/Config/envConfig';
// import { _getAccountAPI } from '../../Utils/Config/axiosConfig';
import PageLoader from '../../UIComponents/Loaders/PageLoader';
// import PathInfo from '../../UIComponents/Navigation/PathInfo/PathInfo';

const Dashboard = () => {
  const [showPageLoader, setShowPageLoader] = useState(false);

  useEffect(() => {
    document.title = 'N D Bhakhar & Co';
    setShowPageLoader(false)
  }, []);

  return (
    <>
    <div className="relative md:flex justify-between w-full h-[89vh]">
      <PageLoader show={showPageLoader} />
      
      <div className='md:w-[100%] h-[89vh]'>
       <img src={require('../../Images/banner.jpg')} alt="" className='w-full h-full'/>
      </div>

      <div className=' text-white md:text-left text-center md:self-center absolute left-[6%]'>
       <span>
        <p className='text-[15px] xl:text-[75px] lg:text-[50px] md:text-[30px] font-head md:mt-[-2%]'>We provide real world solutions to </p>
        <p className='text-[15px] xl:text-[60px] lg:text-[40px] md:text-[30px] font-head'>complex business issues through our services</p>
        <button className='box bg-transparent py-3 px-6 mt-6 translate-x-[10%] '>
         <a href="/" className='md:text-[18px] text-[10px] bold'>View More</a>
        </button>
       </span>
      </div>
     
    </div>

    {/* services */}
    <div className="why-us bg-white pb-[150px]">
    <div className='w-full  pt-[40px]'>
    <p className='text-center'>
      <span className='border-b-2 border-[#459aa7] text-[#407f89] text-[15px] xl:text-[70px] lg:text-[50px] md:text-[30px] font-head text-center font-bold'>Our Services</span>
      <p className='mt-4'>With our company finance and accounting experts, relive yourself with tedious task of bookkeeping and accounting processes. Get a dedicated expert for one-on-one support.</p>
    </p>

    <div className="flex gap-[120px] px-[100px] mt-[60px]">

    <div>
      <div className="service-img relative">
      <img src={require('../../Images/services1.jpg')} alt="" />
      <p className="absolute bottom-[8%] text-white bold text-[30px] left-5">
        Income Tax Return
      </p>
      </div>
    </div>
    <div>
    <div className="service-img relative">
      <img src={require('../../Images/services2.jpg')} alt="" />
      <p className="absolute bottom-[8%] text-white bold text-[30px] left-5 capitalize">
      statutory audit 
      </p>
      </div>
    </div>
    <div>
    <div className="service-img relative">
      <img src={require('../../Images/services3.jpg')} alt="" />
      <p className="absolute bottom-[8%] text-white bold text-[30px] left-5 ">
      GST Return Filing
      </p>
      </div>
    </div>
    </div>
    <div className="flex gap-[120px] px-[100px] mt-[30px]">

    <div>
      <div className="service-img relative">
      <img src={require('../../Images/services4.jpg')} alt="" />
      <p className="absolute bottom-[8%] text-white bold text-[30px] left-5 capitalize">
      project finance
      </p>
      </div>
    </div>
    <div>
    <div className="service-img relative">
      <img src={require('../../Images/services5.jpg')} alt="" />
      <p className="absolute bottom-[8%] text-white bold text-[30px] left-5 capitalize">
      accounting 
      </p>
      </div>
    </div>
    <div>
    <div className="service-img relative">
      <img src={require('../../Images/services6.jpg')} alt="" />
      <p className="absolute bottom-[8%] text-white bold text-[30px] left-5 ">
      Business Consultancy
      </p>
      </div>
    </div>
    </div>
      </div>
    </div>

    {/*  */}
    <div className='service-bg'>
    <div className="service-layer">
      <p className='text-white uppercase font-title text-[40px]'>Let us handle the numbers, so you can focus on growth.
</p>
    </div>
    </div>

    {/* about us */}
    <div className="about-us bg-white">
    <div className='w-full pt-[80px]'>
    <p className='text-center'>
      <span className='border-b-2 border-[#459aa7] text-[#407f89] text-[15px] xl:text-[70px] lg:text-[50px] md:text-[30px] font-head text-center font-bold'>About Our Company</span>
      <p className='mt-4 mx-[150px]'>Our accounting and bookkeeping outsourcing services are designed to be both professional and personalized to meet the unique needs of your practice. Our accounting experts are highly qualified and function as a seamless extension of your in-house team. Adhering to industry standards and incorporating best practices in accounting outsourcing, we strive to help you attain key performance metrics and attain success. By selecting us, you will have access to the value of our established experience and competence, elevating your business to new heights.</p>
    </p>

    <div>
      <div className="about-img relative">
        <img src={require('../../Images/about.jpg')} alt="" />
        <div className="absolute top-[13.5%] left-[43%]">
          <p className='text-white text-[25px]'>
          Cost Effectiveness, flexibility and quick turn-round
          </p>
        </div>
        <div className="absolute top-[27%] left-[46.5%]">
          <p className='text-white text-[25px]'>
          Multi accounting software support
          </p>
        </div>
        <div className="absolute top-[41%] left-[48.5%]">
          <p className='text-white text-[25px]'>
          Scalable and assured business continuity
          </p>
        </div>
        <div className="absolute top-[54.5%] left-[48.5%]">
          <p className='text-white text-[25px]'>
          Proactive Learning and Development
          </p>
        </div>
        <div className="absolute top-[67%] left-[46.5%]">
          <p className='text-white text-[25px]'>
          100% Commitment to data privacy and confidentiality
          </p>
        </div>
        <div className="absolute top-[80.5%] left-[43%]">
          <p className='text-white text-[25px]'>
          Detailed documentation, checklist & email communications
          </p>
        </div>
      </div>
    </div>
      </div>
    </div>

    {/* contact us */}
    <div className="relative">
      <div className="contact-img">
        <img src={require('../../Images/contactUs.jpg')} alt="" />
      </div>
      <div className="contact-head absolute top-[5%] left-[45%]">
      <p className='text-center'>
      <span className='border-b-2 border-[#459aa7] text-[#407f89] text-[15px] xl:text-[70px] lg:text-[50px] md:text-[30px] font-head text-center font-bold capitalize'>contact us</span>
    </p>
      </div>
      <div className="absolute top-[34%] left-[10%] text-white">
        <p className='capitalize text-[40px] font-title'>contact Info</p>
        <p className='flex mt-6 gap-[30px]'>
          <img src={require('../../Images/location.png')} alt="" className='w-[30px] h-[30px]' />
          <span className='capitalize font-title'>A/203, mahalakshmi society, <br /> near yogi chowk, <br /> surat-395010</span>
        </p>
        <p className='flex mt-4 gap-[30px]'>
          <img src={require('../../Images/email.png')} alt="" className='w-[30px] h-[30px]' />
          <span className=' font-title py-[5px]'>nvbhakhar05@gmail.com</span>
        </p>
        <p className='flex mt-6 gap-[30px]'>
          <img src={require('../../Images/phone.png')} alt="" className='w-[30px] h-[30px]' />
          <span className=' font-title py-[5px]'>+91 9054684292</span>
        </p>
      </div>
      <div className="absolute bottom-[18%] left-[10%]">
        <div className="flex gap-2">
          <img src={require('../../Images/facebook.png')} alt="" className='w-[30px] h-[30px]'/>
          <img src={require('../../Images/twitter.png')} alt="" className='w-[30px] h-[30px]'/>
          <img src={require('../../Images/insta.png')} alt="" className='w-[30px] h-[30px]'/>
          <img src={require('../../Images/pintrest.png')} alt="" className='w-[30px] h-[30px]'/>
          <img src={require('../../Images/linked.png')} alt="" className='w-[30px] h-[30px]'/>
        </div>
      </div>

      <div className="absolute top-[34%] left-[35%] text-black">
        <p className='text-[40px] font-title'>Send a Message</p>
        <form class="form-md">
          <div className="flex gap-[40px]">
          <div class="form-group">
            <input id="form_name1" class="form-control" type="text"   required />
            <label for="form_name1">First Name<span class="gl-form-asterisk"></span></label>
          </div>
          <div class="form-group">
            <input id="form_name1" class="form-control" type="text"   required />
            <label for="form_name1">Last Name<span class="gl-form-asterisk"></span></label>
          </div>
          </div>
          <div className="flex gap-[40px] mt-[20px]">
          <div class="form-group">
            <input id="form_name1" class="form-control" type="text"   required />
            <label for="form_name1">Email Address<span class="gl-form-asterisk"></span></label>
          </div>
          <div class="form-group">
            <input id="form_name1" class="form-control" type="text"   required />
            <label for="form_name1">Mobile Number<span class="gl-form-asterisk"></span></label>
          </div>
          </div>
          <div class="form-group mt-[20px]">
            <textarea name="" class="form-control w-[100%]" id="form_name1" cols="30" rows="10" placeholder='' required></textarea>
            <label for="form_name1" className='capitalize'>write your message here...<span class="gl-form-asterisk"></span></label>
          </div>
          <button className='box1 box bg-transparent py-3 mt-[40px]'>
            <a href="/" className='md:text-[18px] text-[10px] bold'>Send</a>
          </button>
        </form>


        <p className='flex mt-6 gap-[30px]'>
          
        </p>
        {/* <p className='flex mt-4 gap-[30px]'>
          <img src={require('../../Images/email.png')} alt="" className='w-[30px] h-[30px]' />
          <span className=' font-title py-[5px]'>nvbhakhar05@gmail.com</span>
        </p>
        <p className='flex mt-6 gap-[30px]'>
          <img src={require('../../Images/phone.png')} alt="" className='w-[30px] h-[30px]' />
          <span className=' font-title py-[5px]'>+91 9054684292</span>
        </p> */}
      </div>
    </div>
    </>
  );
};

export default Dashboard;