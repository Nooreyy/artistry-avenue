const variants = {
	primary: "bg-[#7E000C] text-white hover:bg-[#5f0009]",
	secondary: "border border-[#7E000C] text-[#7E000C] hover:bg-rose-50",
	light: "bg-white text-[#7E000C] hover:bg-rose-50",
};

function Button({ as: Component = "button", variant = "primary", className = "", children, ...props }) {
	return (
		<Component
			className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7E000C] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant] ?? variants.primary} ${className}`}
			{...props}
		>
			{children}
		</Component>
	);
}

export default Button;
