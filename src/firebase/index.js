import fb from 'firebase/app';
import 'firebase/database';
import config from '../config';

fb.initializeApp(config.firebase);

export const db = fb.database();
