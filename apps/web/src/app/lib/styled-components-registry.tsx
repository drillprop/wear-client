"use client";
import isPropValid from "@emotion/is-prop-valid";
import { useServerInsertedHTML } from "next/navigation";
import { type ReactNode, useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

/**
 * styled-components v6 dropped the babel plugin's automatic prop filtering, so
 * custom props on the frozen legacy components (e.g. `imageUrl` on a
 * `styled.div`) leak to the DOM and trip a React warning. Filter them the way
 * the styled-components docs recommend: forward only valid HTML attributes to
 * DOM elements, everything to custom components. Covers every legacy component
 * rendered under the App Router during the migration without editing them; the
 * styling port (#66) drops this along with styled-components.
 */
function shouldForwardProp(prop: string, element: unknown): boolean {
	return typeof element === "string" ? isPropValid(prop) : true;
}

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

	// On the client, styled-components manages injection itself — but the prop
	// filter still has to apply, so it stays wrapped (without the server sheet).
	if (typeof window !== "undefined") {
		return (
			<StyleSheetManager shouldForwardProp={shouldForwardProp}>
				{children}
			</StyleSheetManager>
		);
	}

	return (
		<StyleSheetManager
			sheet={styledComponentsStyleSheet.instance}
			shouldForwardProp={shouldForwardProp}
		>
			{children}
		</StyleSheetManager>
	);
}
