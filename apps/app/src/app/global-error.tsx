"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { Button } from "@comp/ui/button";
import NextError from "next/error";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error, reset: () => void }) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<html lang="en">
			<body>
				<div className="h-[calc(100vh-200px)] w-full">
					<div className="flex flex-col items-center justify-center h-full">
						<div className="flex justify-between items-center flex-col mt-8 text-center mb-8">
							<h2 className="font-medium mb-4">Something went wrong</h2>
							<p className="text-sm text-[#878787]">
								An unexpected error has occurred. Please try again
								<br /> or contact support if the issue persists.
							</p>
						</div>

						<div className="flex space-x-4">
							<Button onClick={() => reset()} variant="outline">
								Try again
							</Button>

							<Link href="/account/support">
								<Button>Contact us</Button>
							</Link>
						</div>

						<NextError statusCode={0} />
					</div>
				</div>
			</body>
		</html>
	);
}
