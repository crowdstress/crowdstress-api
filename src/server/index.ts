import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import passport from 'passport';

import { APP_PORT, SESSIONS_SECRET } from '@/config';
import { fetchProjects } from '@/controllers/fetchProjects';
import { getThumbnail } from '@/controllers/getThumbnail';
import { loadProject } from '@/controllers/loadProject';
import { login } from '@/controllers/login';
import { logout } from '@/controllers/logout';
import { mathService } from '@/controllers/mathService';
import { newProject } from '@/controllers/newProject';
import { saveProject } from '@/controllers/saveProject';
import { signup } from '@/controllers/signup';
import { whoami } from '@/controllers/whoami';
import '@/modules/auth';
import { authMiddleware } from '@/modules/authMiddleware';
import { sessionMiddleware } from '@/modules/sessionMiddleware';
import { start } from '@/server/start';

const app = express();

app.use(cookieParser(SESSIONS_SECRET));
app.use(bodyParser.json());
app.use(sessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', login);
app.get('/logout', logout);
app.post('/signup', signup);
app.get('/whoami', authMiddleware, whoami);

app.post('/project', authMiddleware, newProject);
app.put('/project/:id', authMiddleware, saveProject);
app.get('/project/:id', authMiddleware, loadProject);

app.get('/projects', authMiddleware, fetchProjects);

app.get('/thumbnail/:id', authMiddleware, getThumbnail);

app.use('/math', authMiddleware, mathService);

app.listen(APP_PORT, start);
