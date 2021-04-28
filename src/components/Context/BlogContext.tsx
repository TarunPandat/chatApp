import React from 'react'


 const BlogContext = React.createContext<any>([])

 const blogReducer = (state: any, action: any) => {
    switch(action.type) {
        case 'add_blog':
            return [...state, {id: state.length + 1, name: action.payload}]
        case 'delete_blog':
            let data = [...state]
            let index = data.indexOf(action.item)
            data.splice(index, 1)
            state = data
            return state
        default: 
            return state
    }
 }


export function BlogProvider({children}: any) {
    const initBlogs = [
        {id: 1, name: 'Tarun'},
        {id: 2, name: 'Tarun Pandat'},
        {id: 3, name: 'tarun Bhardwaj'}
    ]
   
    const [blogs, setBlogs] = React.useReducer(blogReducer, initBlogs)
   

    
    return (
        <BlogContext.Provider value={{blogs, setBlogs}}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogContext
