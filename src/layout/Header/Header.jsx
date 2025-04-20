import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import UserLocalStorage from '../../Auth/UserAuth';
import userAuth from "../../Auth/UserAuth";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Profile from "../User/Profile";
import {search} from "../../Repositories/SearchRepository";
import Link from "../../components/Link";
import Image from "../../components/Image";
import {menuRepository} from "../../Repositories/MenuRepository";
import LinkNavigation from "../../components/LinkNavigation";


export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    let [searchTerm, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('login');
    const [isProfileOpen, setProfileOpen] = useState(false);
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

    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
        setMobileMenuOpen(false);
    };

    const openProfile = () => {
        setProfileOpen(true);
        setMobileMenuOpen(false);
    }

    const closeModal = () => {
        setModalOpen(false);
        setProfileOpen(false);
    };

    const switchModal = (type) => {
        setModalType(type);
    };

    useEffect(() => {
        if (searchTerm.length >= 3) {
            const fetchData = async () => {
                try {
                    const results = await search(searchTerm);
                    setSearchResults(results);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };
            fetchData();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <>
        <header>
            <nav className={`mx-auto flex items-center justify-between p-6 lg:px-20`} aria-label="Global">
                <div className="flex lg:flex-1 items-center gap-3">
                    <a href="/" className="-m-1.5 p-1.5 text-base font-semibold leading-6 text-white">
                        <img
                            src={"/images/logo.png"}
                            alt={"logo"}
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-8 w-8" aria-hidden="true"/>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12 relative">
                    <img className={"searchIcon"} src={"/images/search.svg"} alt={"login"}/>
                    <Input
                        type={"search"}
                        className={"vyhledavac"}
                        placeholder={"Vyhledat"}
                        value={searchTerm}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {searchTerm.length < 3 && searchTerm.length > 0 && (
                        <div className="text-gray-500 text-xs mt-7 absolute left-0 top-1/2">
                            Zadejte alespoň 3 znaky.
                        </div>
                    )}
                    {searchTerm.length >= 3 && searchResults.length > 0 && (
                        <div className="search-results absolute top-full left-0 w-full">
                            <ul>
                                {searchResults.map(result => {
                                    let linkHref = "/";
                                    if (result.type === "player") {
                                        linkHref = `/player/${result.id}`;
                                    } else if (result.type === "league") {
                                        linkHref = `/league/${result.id}`;
                                    } else if (result.type === "team") {
                                        linkHref = `/team/${result.id}`;
                                    }

                                    return (
                                        <li
                                            key={result.id}
                                            className="p-2 flex items-center cursor-pointer hover:bg-gray-700 rounded-md transition"
                                        >
                                            <a href={linkHref} className="flex items-center w-full p-2">
                                                <Image
                                                    src={result.image_src}
                                                    alt={result.name}
                                                    className="w-8 h-8 mr-2 rounded-2xl object-contain bg-white"
                                                />
                                                <span className="text-white">{result.name}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-6">
                    {UserLocalStorage.isUserLoggedIn() && (
                        <div onClick={() => openProfile()} className={"buttonLogin flex gap-2"}>
                            <img src={"/images/login.svg"} alt={"login"}/>
                            <p
                                className={userAuth.isAdmin() ? "text-sm font-semibold leading-6 text-black uppercase" : "text-sm font-semibold leading-6 text-white uppercase"}
                            >
                                Profil
                            </p>
                        </div>
                    )}
                    <div onClick={() => {
                        if (UserLocalStorage.isUserLoggedIn()) {
                            UserLocalStorage.logout();
                        } else {
                            openModal('login');
                        }
                    }} className={"buttonLogin flex gap-2"}>
                        <img src={"/images/login.svg"} alt={"login"}/>
                        <p
                            className={userAuth.isAdmin() ? "text-sm font-semibold leading-6 text-black uppercase" : "text-sm font-semibold leading-6 text-white uppercase"}
                        >
                            {UserLocalStorage.isUserLoggedIn() ? "Odhlásit se" : "Přihlášení"}
                        </p>
                    </div>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10"/>
                <Dialog.Panel
                    className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-custom px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5 text-base font-semibold leading-6 text-white">
                            <img
                                src={"/images/logo.png"}
                                alt={"logo"}
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-8 w-8" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="mt-3 flow-root">
                        <div className="pt-6 flex items-start flex-col gap-6">
                            {menuItems.map((item, index) => (
                                <LinkNavigation
                                    key={index}
                                    classNameDiv="flex gap-3 flex-row-reverse"
                                    className="text-white lg:text-l uppercase font-bold"
                                    src={String(item.img_src).replace(/["']/g, "")}
                                    text={item.name}
                                    alt={item.name}
                                    href={item.url}

                                />
                            ))}
                        </div>
                        <div className="-my-6 divide-y divide-gray-500/25 mt-8">
                            <div className="py-6">
                                {UserLocalStorage.isUserLoggedIn() && (
                                    <div onClick={() => openProfile()} className={"flex gap-2"}>
                                        <img src={"/images/login.svg"} alt={"login"}/>
                                        <p
                                            className={userAuth.isAdmin() ? "font-bold leading-6 text-black uppercase" : "font-bold leading-6 text-white uppercase"}
                                        >
                                            Profil
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="-my-6 divide-y divide-gray-500/25">
                            <div className="py-6">
                                <div onClick={() => {
                                    if (UserLocalStorage.isUserLoggedIn()) {
                                        UserLocalStorage.logout();
                                    } else {
                                        openModal('login');
                                    }
                                }}
                                   className={userAuth.isAdmin() ? "font-bold leading-6 text-white" : "font-bold leading-6 text-white uppercase"}>
                                    {UserLocalStorage.isUserLoggedIn() ? "Odhlásit se" : "Přihlásit"}
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
            {isModalOpen && (
                <Modal
                    type={modalType}
                    onClose={closeModal}
                    onSwitchModal={switchModal}
                />
            )}
            {isProfileOpen && (
                <Profile
                    onClose={closeModal}
                    username={UserLocalStorage.getUsername()}
                />
            )}
        </header>
            <div className="lg:hidden lg:gap-x-12 relative px-5 mobileSearch py-7">
                <img className={"searchIcon"} src={"/images/search.svg"} alt={"login"}/>
                <Input
                    type={"search"}
                    className={"vyhledavac"}
            placeholder={"Vyhledat"}
            value={searchTerm}
            onChange={(e) => setSearch(e.target.value)}
        />
        {searchTerm.length < 3 && searchTerm.length > 0 && (
            <div className="text-gray-500 text-xs mt-7 absolute left-0 top-1/2 px-5">
                Zadejte alespoň 3 znaky.
            </div>
        )}
        {searchTerm.length >= 3 && searchResults.length > 0 && (
            <div className="search-results absolute top-full left-0 w-full px-5">
                <ul>
                    {searchResults.map(result => {
                        let linkHref = "/";
                        if (result.type === "player") {
                            linkHref = `/player/${result.id}`;
                        } else if (result.type === "league") {
                            linkHref = `/league/${result.id}`;
                        } else if (result.type === "team") {
                            linkHref = `/team/${result.id}`;
                        }

                        return (
                            <li
                                key={result.id}
                                className="p-2 flex items-center cursor-pointer hover:bg-gray-700 rounded-md transition"
                            >
                                <a href={linkHref} className="flex items-center w-full p-2">
                                    <Image
                                        src={result.image_src}
                                        alt={result.name}
                                        className="w-8 h-8 mr-2 rounded-2xl object-contain bg-white"
                                    />
                                    <span className="text-white">{result.name}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )}

    </div>
    </>
)
    ;
}

const iconStyle = {
    transform: "rotate(20deg)",
    fontSize: "2rem",
    color: "white"
};
