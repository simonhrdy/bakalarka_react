import { useEffect, useState } from "react";
import LinkNavigation from "../../components/LinkNavigation";
import { menuRepository } from "../../Repositories/MenuRepository";

export default function HeaderNavigation() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        async function fetchMenuItems() {
            const data = await menuRepository();
            if (data) {
                setMenuItems(data);
            }
        }
        fetchMenuItems().then(r => console.log("Menu items loaded"));
    }, []);

    return (
        <nav className="lg:flex lg:flex-1 gap-5 hidden lg:gap-12 px-5 lg:px-20 py-5 items-end headerNavigation flex-wrap justify-center lg:justify-start" aria-label="Global">
            {menuItems.map((item, index) => (
                <LinkNavigation
                    key={index}
                    classNameDiv="flex gap-3 items-center flex-col-reverse lg:flex-row-reverse"
                    className="text-white lg:text-l uppercase font-bold"
                    src={String(item.img_src).replace(/["']/g, "")}
                    text={item.name}
                    alt={item.name}
                    href={item.url}

                />
            ))}
        </nav>
    );
}
