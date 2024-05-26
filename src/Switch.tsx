import { Switch as TailwindSwitch } from '@headlessui/react'

interface Props {
    onChange: () => void;
    isEnabled: boolean;
}

export default function Switch(props: Props) {

  return (
    <TailwindSwitch
      checked={props.isEnabled}
      onChange={() => { 
        props.onChange()
     }}
      className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
    >
      <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
    </TailwindSwitch>
  )
}