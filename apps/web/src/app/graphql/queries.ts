import { graphql } from "@/gql";

/**
 * Walking-skeleton document (#67). One real public query, executed by the home
 * page's client probe through the same-origin proxy to prove the full path
 * browser → /api/graphql → apps/api. Typed by the client-preset codegen off the
 * committed schema.
 *
 * The migrated pages introduce the central `src/graphql/{queries,mutations}`
 * convention in the data-page slices; the skeleton keeps its lone document here,
 * colocated with the App Router tree the codegen scans.
 */
export const homeItemCountQuery = graphql(`
	query HomeItemCount {
		items {
			count
		}
	}
`);
