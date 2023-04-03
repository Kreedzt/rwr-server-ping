import { createEffect, createSignal } from 'solid-js';
import { Button } from '@suid/material';

function Setting() {
  return (
    <div>
      <Button color="error" variant="contained">重置所有配置</Button>
    </div>
  );
}

export default Setting;
