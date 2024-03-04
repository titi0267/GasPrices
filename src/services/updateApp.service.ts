import {HOST} from '@env';

const updateApp = async (setVersion: (value: any) => void) => {
  const pj = require('../../package.json');
  const body = {version: pj.version};
  const res = await fetch(`${HOST}/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw Error('Error on version check');
  const resolve = await res.json();
  setVersion(resolve);
};

export default updateApp;
