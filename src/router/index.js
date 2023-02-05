import Wrapper from "../components/Wrapper";
import Bank from "../pages/Bank";
import Customer from "../pages/Customer";
import CustomerType from "../pages/CustomerType";
import CustomerCode from "../pages/CustomerCode";
import Dashboard from "../pages/Dashboard";
import Invoice from "../pages/Invoice";
import Job from "../pages/Job";
import JobType from "../pages/JobType";
import NotFound from "../pages/NotFound";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "job",
        element: <Job />,
      },
      {
        path: "jobtype",
        element: <JobType />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "customertype",
        element: <CustomerType />,
      },
      {
        path: "customercode",
        element: <CustomerCode />,
      },
      {
        path: "bank",
        element: <Bank />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
    ],
  },
]);
