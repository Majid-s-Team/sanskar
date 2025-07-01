import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./app/Auth/Login";
import Otp from "./app/Auth/Otp";
import Resetpassword from "./app/Auth/ResetPassword";
import ForgotPassword from "./app/Auth/ForgotPassword";
import SignUp from "./app/Auth/SignUp";
import Step2 from "./app/Auth/Step2";
import Step3 from "./app/Auth/Step3";
import Home from "./app/Home";
import AttendanceManagement from "./app/AttendanceManagement";
import GurukulPrayers from "./app/GurukulPrayers";
import Events from "./app/Events";
import Forms from "./app/Forms";
import Setting from "./app/Setting";
import WeeklyUpdates from "./app/WeeklyUpdates";
import Multimedia from "./app/Multimedia";
import Announcement from "./app/Announcement";
import ContactTeacher from "./app/ContactTeacher";
import StudentInfo from "./app/StudentInfo";
import AbsentForm from "./app/Forms/AbsentForm";
import EventDetails from "./app/EventDetails";
import EarlyPickUpForm from "./app/Forms/EarlyPickUpForm";
import ParentProfile from "./app/ParentProfile";
import About from "./app/About";
import PrivacyPolicy from "./app/PrivacyPolicy";
import Faqs from "./app/Faqs";
import MyAttendance from "./app/MyAttendance";
import StudentManagement from "./app/StudentManagement";
import StudentAttendance from "./app/StudentAttendance";
import RequestManagement from "./app/RequestManagement";
import AddStudent from "./app/Forms/AddStudent";
import RegistrationForm from "./app/Forms/RegistrationForm";
import SiblingEnrollmentForm from "./app/Forms/SiblingEnrollmentForm";
import TermsCondition from "./app/TermsCondition";
import ProjectForm from "./app/Forms/ProjectForm";
import ExpenseForm from "./app/Forms/ExpenseForm";
import ArchivedTable from "./app/ArchivedTable";
import StudentList from "./app/StudentList";
import AddAttendance from "./app/Forms/AddAttendance";
import FormDetails from "./app/Forms/FormDetails";
import Notifications from "./app/Notifications";
import Calendar from "./app/Calendar";
import AddWeeklyUpdates from "./app/Forms/AddWeeklyUpdates";
import TeachersManual from "./app/TeachersManual";
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/add-student" element={<Step2 />} />
        <Route path="/signup/address" element={<Step3 />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp/:email" element={<Otp />} />
        <Route
          path="/reset-password/:reset_password_token"
          element={<Resetpassword />}
        />

        {/* home routes */}
        <Route path="/home" element={<Home />} />
        <Route
          path="/attendance-management"
          element={<AttendanceManagement />}
        />
        <Route path="/gurukul-prayer" element={<GurukulPrayers />} />
        <Route path="/events-rsvp" element={<Events />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/settings" element={<Setting />} />

        {/* inner routes */}
        <Route path="/forms/add-student" element={<AddStudent />} />
        <Route path="/forms/absent-request-form" element={<AbsentForm />} />
        <Route path="/forms/early-pickup-form" element={<EarlyPickUpForm />} />
        <Route
          path="/forms/sibling-enrollment-form"
          element={<SiblingEnrollmentForm />}
        />

        <Route path="/home/weekly-updates" element={<WeeklyUpdates />} />
        <Route path="/home/multimedia" element={<Multimedia />} />
        <Route path="/home/announcement" element={<Announcement />} />
        <Route path="/home/contact-teacher" element={<ContactTeacher />} />
        <Route path="/home/student-info" element={<StudentInfo />} />
        <Route path="/event/details" element={<EventDetails />} />

        <Route path="/parents-profile" element={<ParentProfile />} />
        <Route path="/re-registration-form" element={<RegistrationForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/terms-conditions" element={<TermsCondition />} />
        <Route path="/about/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about/faqs" element={<Faqs />} />

        {/* teacher routes */}
        <Route path="/my-attendance" element={<MyAttendance />} />
        <Route path="student-management" element={<StudentManagement />} />
        <Route path="/student-attendance" element={<StudentAttendance />} />
        <Route path="/request-management" element={<RequestManagement />} />
        <Route
          path="/forms/arts-and-craft-project-form"
          element={<ProjectForm />}
        />
        <Route
          path="/forms/expense-reimbursement-form"
          element={<ExpenseForm />}
        />
        <Route path="/archived" element={<ArchivedTable />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/add-attendance" element={<AddAttendance />} />
        <Route
          path="/request-management/form-details"
          element={<FormDetails />}
        />

        <Route path="/notifications" element={<Notifications />} />
        <Route path="/gurukul-calendar" element={<Calendar />} />
        <Route path="/add-weekly-updates" element={<AddWeeklyUpdates />} />
        <Route path="/about/teacher-manual" element={<TeachersManual />} />
      </Routes>
    </>
  );
};

export default App;
