interface MenuButtonProps {
  image: string;
  onClick: () => void;
  title: string;
}

export const MenuButton = ({ image, onClick, title }: MenuButtonProps) => {
  return (
    <button
      className="flex flex-col cursor-pointer rounded-xl overflow-hidden gap-6 bg-[#00AEC7] transition-colors ease duration-[0.2s]  w-[225px] h-[225px]"
      type="button"
      onClick={onClick}
    >
      <img className="object-fit max-w-full max-h-[160px]" src={image} />
      <p className="text-lg text-white font-bold">{title}</p>
    </button>
  );
};
