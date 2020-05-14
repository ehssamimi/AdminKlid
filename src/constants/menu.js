const data = [
    {
        id: "access_level",
        icon: "iconsminds-air-balloon-1",
        label: "AccessLevel",
        to: "/access-level",
        subs: [
            {
                icon: "simple-icon-paper-plane",
                label: "permission",
                to: "/access-level/permission",
                subs: [
                    {
                        icon: "simple-icon-paper-plane",
                        label: "permission Show",
                        to: "/access-level/permission/show"
                    },
                    {
                        icon: "simple-icon-paper-plane",
                        label: "permission Create",
                        to: "/access-level/permission/create"
                    }
                ]
            },
            {
                icon: "simple-icon-paper-plane",
                label: "Role",
                to: "/access-level/role",
                subs: [
                    {
                        icon: "simple-icon-paper-plane",
                        label: "role Show",
                        to: "/access-level/role/show"
                    },
                    {
                        icon: "simple-icon-paper-plane",
                        label: "role Create",
                        to: "/access-level/role/create/:Id?"
                    }
                ]
            },
            {
                icon: "simple-icon-paper-plane",
                label: "user role",
                to: "/access-level/user-role",
                subs: [
                    {
                        icon: "simple-icon-paper-plane",
                        label: "user role Show",
                        to: "/access-level/user-role/show"
                    },
                    {
                        icon: "simple-icon-paper-plane",
                        label: "user role Create",
                        to: "/access-level/user-role/create/:Id?"
                    }
                ]
            },
            {
                icon: "simple-icon-paper-plane",
                label: "trusted service",
                to: "/access-level/trusted_service",
                subs: [
                    {
                        icon: "simple-icon-paper-plane",
                        label: "trusted service Show",
                        to: "/access-level/trusted_service/show"
                    },
                    {
                        icon: "simple-icon-paper-plane",
                        label: "trusted serviceCreate",
                        to: "/access-level/trusted_service/create/:Id?"
                    }
                ]
            }
        ]
    },
    {
        id: "content",
        icon: "iconsminds-air-balloon-1",
        label: "محتوا",
        to: "/content",
        subs: [
            {
                icon: "simple-icon-paper-plane",
                label: "کورس ها",
                to: "/content/courses"
            },    {
                icon: "simple-icon-paper-plane",
                label: "ویدیو های در حال تبدیل",
                to: "/content/in-progress"

            },   {
                icon: "simple-icon-paper-plane",
                label: "دسترسی ویدیو ها",
                to: "/content/permission",
                subs:[
                    {
                        icon: "simple-icon-paper-plane",
                        label: "به روز رسانی دسترسی ها",
                        to: "/content/permission/access-all",
                    }
                ]
            }
        ]
    },
    {
        id: "User",
        icon: "iconsminds-air-balloon-1",
        label: "کاربران",
        to: "/user",
        subs: [
            {
                icon: "simple-icon-paper-plane",
                label: "لیست کاربران",
                to: "/user/all",

            } , {
                icon: "simple-icon-paper-plane",
                label: "ثبت کاربر",
                to: "/user/sign-up",

            }, {
                icon: "simple-icon-paper-plane",
                label: "مشاهده اطلاعات کاربر",
                to: "/user/get-info",

            }, {
                icon: "simple-icon-paper-plane",
                label: "برنامه درسی",
                to: "/user/schedule",
                subs: [
                    {
                        icon: "simple-icon-paper-plane",
                        label: "درخواست کننده ها",
                        to: "/user/schedule/requested"
                    },
                    {
                        icon: "simple-icon-paper-plane",
                        label: "تخصیص داده  شده ها",
                        to: "/user/schedule/allocate"
                    }
                ]

            }
        ]

    },
    {
        id: "configure",
        icon: "iconsminds-air-balloon-1",
        label: "پیکربندی",
        to: "/configure",
        subs:[
            {
                icon: "simple-icon-paper-plane",
                label: "عکس پیش فرض کاربر",
                to: "/configure/default-profile"
            }

        ]
    },
    {
        id: "exit",
        icon: "iconsminds-air-balloon-1",
        label: "خروج",
        to: "/exit",
    },

    // {
    //     id: "exit",
    //     icon: "iconsminds-air-balloon-1",
    //     label: "خروج",
    //     to: "/exit"
    //
    // },

    // {
    //     id: "gogo",
    //     icon: "iconsminds-air-balloon-1",
    //     label: "menu.gogo",
    //     to: "/app/gogo",
    //     subs: [
    //         {
    //             icon: "simple-icon-paper-plane",
    //             label: "menu.start",
    //             to: "/app/gogo/start"
    //         }
    //     ]
    // },
    // {
    //     id: "upload",
    //     icon: "iconsminds-air-balloon-1",
    //     label: "Upload",
    //     to: "/upload",
    //     subs: [
    //         {
    //             icon: "simple-icon-paper-plane",
    //             label: "menu.start",
    //             to: "/upload/upload-video"
    //         }
    //     ]
    // },
    // {
    //     id: "secondmenu",
    //     icon: "iconsminds-three-arrow-fork",
    //     label: "menu.second-menu",
    //     to: "/app/second-menu",
    //     subs: [
    //         {
    //             icon: "simple-icon-paper-plane",
    //             label: "menu.second",
    //             to: "/app/second-menu/second"
    //         }
    //     ]
    // },
    // {
    //     id: "blankpage",
    //     icon: "iconsminds-bucket",
    //     label: "menu.blank-page",
    //     to: "/app/blank-page"
    // },
    // {
    //     id: "docs",
    //     icon: "iconsminds-library",
    //     label: "menu.docs",
    //     to: "https://gogo-react-docs.coloredstrategies.com/",
    //     newWindow: true
    // }
];
export default data;
