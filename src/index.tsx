import { createRoot } from 'react-dom/client';
// eslint-disable-next-line max-len
import { HashRouter, Route, Routes } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { NotFoundPage } from './NotFoundPage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        {/* Вместо <h1> используем компонент */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>,
);
