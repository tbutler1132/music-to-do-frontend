
export const users = [
    {
        id: "1",
        username: "tim",
        password: "1234",
        albums: [
            {
                id: 1,
                title: "project z",
                complete: false,
                songs: [
                    {
                        title: "song 1"
                    },
                    {
                        title: "song 2"
                    },
                    {
                        title: "song 3"
                    }
                ]
            },
            {
                id: 2,
                title: "project x",
                complete: true,
                songs: [
                    {
                        title: "song 1"
                    },
                    {
                        title: "song 2"
                    },
                    {
                        title: "song 3"
                    }
                ]
            },
            {
                id: 3,
                title: "project y",
                complete: true,
                songs: [
                    {
                        title: "song 1"
                    },
                    {
                        title: "song 2"
                    },
                    {
                        title: "song 3"
                    }
                ]
            },
        ]
    }
]

export const task = [
    {
        id: 1,
        content: "Make art",
        general: true,
    },
    // {
    //     id: 2,
    //     content: "Mix beat",
    //     general: false,
    // }
]

export const song = [
    {
        id: 1,
        title: "Color",
        tasks: [    
            {
                id: 2,
                content: "Mix beat",
                general: false,
            }
        ]
    }
]

export const user = {
    username: "Tim",
    password: "1234",
    albumTitle: "Project Z",
    tasks: [     
        {
            id: 1,
            content: "Make art",
            general: true,
        }
    ],
    songs: [
        {
            id: 1,
            title: "Color",
            tasks: [    
                {
                    id: 2,
                    content: "Mix beat",
                    general: false,
                }
            ]
        }
    ]
}