"use client";
import { useServerInsertedHTML } from "next/navigation";
import { type ReactNode, useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

/**
 * Temporary styled-components bridge (#67). App Router streams RSC output, so
 * styled-components' server styles must be collected and injected via
 * `useServerInsertedHTML` instead of the Pages Router `_document` sheet. This
 * keeps the unmigrated Pages Router components rendering (styled) during the
 * migration; the styling port (#66) deletes both this registry and
 * styled-components.
 */
export default function StyledComponentsRegistry({
	children,
}: {
	children: ReactNode;
}) {
	const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

	useServerInsertedHTML(() => {
		const styles = styledComponentsStyleSheet.getStyleElement();
		styledComponentsStyleSheet.instance.clearTag();
		return <>{styles}</>;
	});

	// On the client, styled-components manages injection itself.
	if (typeof window !== "undefined") {
		return <>{children}</>;
	}

	return (
		<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
			{children}
		</StyleSheetManager>
	);
}
