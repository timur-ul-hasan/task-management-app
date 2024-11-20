import { RouteObject } from "react-router";
import Layout from "src/layouts";
import Status404 from "src/content/Status404";
import Authenticated from "src/components/Authenticated";
import TasksPage from "src/content/Tasks";
import SharedTasks from "src/content/Tasks/SharedWithMe";
import TaskPage from "src/content/Tasks/TaskPage";


const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Authenticated>
        <Layout />
      </Authenticated>
    ),
    children: [
      {
        path: "/",
        element: <TasksPage />,
      },
      {
        path: "shared-with-me",
        element: <SharedTasks/>,
      },
      {
        path: "task/:id",
        element: <TaskPage />,
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "*",
    element: <Status404 />,
  },
];

export default routes;
