export default function TextArea({
  onChange,
  value,
  disableBgIcons = false,
  customValidation,
  placeholder = 'Dirección de entrega',
}: {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  disableBgIcons?: boolean;
  customValidation?: () => boolean;
  placeholder?: string;
}) {
  function getBackgroundIcon() {
    if (disableBgIcons) {
      return '';
    }

    if (value?.length > 0) {
      return 'url("/images/forms/formCheck.svg") #ffffff no-repeat calc(100% - 12px) 12px';
    }

    return '';
  }

  return (
    <textarea
      className={`w-full h-24 p-4 pr-12 rounded-2xl border resize-none ${
        value?.length > 0 ? 'border-hg-black' : 'border-hg-black300'
      }`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      style={{ background: getBackgroundIcon() }}
    />
  );
}
