import { cn } from "@comp/ui/cn";
import { Input } from "@comp/ui/input";
import React from "react";
import OtpInput, { type OTPInputProps } from "react-otp-input";

type OtpOptions = Omit<OTPInputProps, "renderInput">;

type OtpStyledInputProps = {
	className?: string;
} & OtpOptions;

/**
 * Otp input Docs: {@link: https://shadcn-extension.vercel.app/docs/otp-input}
 */

export const OtpStyledInput = ({
	className,
	...props
}: OtpStyledInputProps) => {
	return (
		<OtpInput
			{...props}
			renderInput={(inputProps) => (
				<Input
					{...inputProps}
					className={cn("!w-12 !appearance-none selection:bg-none ", className)}
				/>
			)}
			containerStyle={`flex justify-center items-center flex-wrap  text-2xl font-bold ${
				props.renderSeparator ? "gap-1" : "gap-x-3 gap-y-2"
			}`}
		/>
	);
};
