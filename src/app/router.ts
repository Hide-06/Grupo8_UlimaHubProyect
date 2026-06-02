import { createBrowserRouter } from 'react-router';
import NotFound from '@/pages/NotFound';
import DashBoardPage from '@/pages/home';
import TasksPage from '@/pages/tasks';
import CoursesPage from '@/pages/courses';
import CalendarPage from '@/pages/calendar';
import AppLayout from '@/app/layouts/AppLayout';
import LoginPage from '@/pages/login';
import ArchivosPage from '@/pages/archivos';
import NotesPage from '@/pages/notes';
import IntelligentSearchPage from '@/pages/search';
import GruposPage from '@/pages/grupos';
import RutaProtegida from '@/app/RutaProtegida';
import ChatPage from '@/pages/chat';
import UserPage from '@/pages/user';

export default createBrowserRouter([
  {
    path: '/',
    Component: LoginPage,
  },
  {
    Component: RutaProtegida,
    children: [
      {
        Component: AppLayout,
        children: [
          {
            path: 'home',
            Component: DashBoardPage,
          },
          {
            path: 'tasks',
            Component: TasksPage,
          },
          {
            path: 'courses',
            Component: CoursesPage,
          },
          {
            path: 'calendar',
            Component: CalendarPage,
          },
          {
            path: 'files',
            Component: ArchivosPage,
          },
          {
            path: 'notes',
            Component: NotesPage,
          },
          {
            path: 'teams',
            Component: GruposPage,
          },
          {
            path: 'chat',
            Component: ChatPage,
          },
          {
            path: 'user',
            Component: UserPage,
          },
        ],
      },
      {
        path: 'search', 
        Component: IntelligentSearchPage,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
