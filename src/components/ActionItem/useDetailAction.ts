import { createSignal } from "solid-js";
import { DisplayServerItem } from "../../share/types";

export const useDetailAction = () => {
  const [open, setOpen] = createSignal(false);
  const [data, setData] = createSignal<DisplayServerItem>();

  const onClose = () => {
    setOpen(false);
  }

  const show = (data: DisplayServerItem) => {
    setOpen(true);
    setData(data);
  }

  return {
    open,
    onClose,
    data,
    show
  }
}