import type React from "react";
import type { ItemsQuery } from "@/gql/graphql";
import LinkAnchor from "../../LinkAnchor/LinkAnchor";

interface Props {
	items: ItemsQuery["items"]["select"];
}

/**
 * Catalogue product grid (#85). `Products.styles.ts` ports to Tailwind: the
 * `auto-fit`/`minmax` card grid, and the per-card hover (image zoom + product
 * name fade-in) that was two descendant `:hover` rules collapses onto a `group`
 * on each card. Desktop-first `max-width:500` inverts to mobile-first — the
 * smaller mobile card/image sizes are the base, `sm:` restores the desktop
 * sizes. The `grays[4]` border maps onto the shadcn `border` token.
 */
const Products: React.FC<Props> = ({ items }) => {
	return (
		<div className="mt-[75px] grid grid-cols-[repeat(auto-fit,minmax(200px,300px))] justify-center justify-items-center gap-[30px]">
			{items?.map(
				(item) =>
					item && (
						<div key={item.id} className="group relative w-[250px] sm:w-full">
							<LinkAnchor href={`/shop/item?id=${item.id}`}>
								<img
									src={item.imageUrl}
									alt={item.name}
									className="h-[270px] w-full border border-border object-cover transition-[transform,opacity] duration-300 group-hover:scale-[1.01] sm:h-[380px]"
								/>
								<div className="mt-[14px] flex w-full justify-between">
									<div className="font-roboto text-2 text-foreground opacity-80 transition-opacity duration-300 group-hover:opacity-100">
										{item.name}
									</div>
									<div className="font-roboto text-2 text-foreground">
										${item.price}
									</div>
								</div>
							</LinkAnchor>
						</div>
					),
			)}
		</div>
	);
};

export default Products;
