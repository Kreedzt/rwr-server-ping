import { createEffect, createSignal, useContext } from 'solid-js';
import { Button } from '@suid/material';
import { HomeContext } from '../../contexts/home';
import toast from 'solid-toast';

function Setting() {
  const homeContext = useContext(HomeContext);

  const onReset = async () => {
    try {
      await homeContext?.configStore.reset();
      toast.success('重置成功');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div>
      <Button color="error" variant="contained" onClick={onReset}>
        重置所有配置
      </Button>
    </div>
  );
}

export default Setting;
