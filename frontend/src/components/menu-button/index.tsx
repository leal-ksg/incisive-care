interface MenuButtonProps {
  image: string;
  onClick: () => void;
  title: string;
}

export const MenuButton = ({ image, onClick, title }: MenuButtonProps) => {
  return (
    <button
      className="ease hover:drop-shadow-popover-foreground flex h-[225px] w-[225px] cursor-pointer flex-col gap-6 overflow-hidden rounded-xl bg-[#00AEC7] transition-all duration-[0.2s] hover:shadow-lg"
      type="button"
      onClick={onClick}
    >
      <img
        className="mt-4 max-h-[130px] max-w-full object-scale-down"
        src={image}
      />
      <p className="text-lg font-bold text-white">{title}</p>
    </button>
  );
};
