import invariant from 'tiny-invariant';
import { getPostEdit } from "~/post";
import { redirect, Form, useActionData, useTransition, useLoaderData } from "remix";
import { updatePost } from "~/post";


export let loader = async({params}) => {
    invariant(params.edit, "expected params.edit");
    return getPostEdit(params.edit);
}

export let action = async ({ request }) => {
    let formData = await request.formData();

    let title = formData.get("title");
    let slug = formData.get("slug")
    let markdown = formData.get("markdown")
    let id = formData.get("id");

    let errors = {};
    if (!title) errors.title = true;
    if (!slug) errors.slug = true;
    if (!markdown) errors.markdown = true;
    
    if (Object.keys(errors).length) {
        return errors;
    }

    console.log('calling updatePost with id, title, slug, markdown: ', id, title, slug, markdown)
    await updatePost({id, title, slug, markdown});

    return redirect("/admin")
}

export default function PostSlug() {
    let errors = useActionData();
    let transition = useTransition();
    let post = useLoaderData();
    return (
            <Form method="post">
                <p>
                    <input className="hiddenBlogID" name="id" defaultValue={post.id}>
                    </input>
                </p>
                <p>
                    <label htmlFor="">
                        Post Title: {" "} {errors?.title && <em>Title is required</em>} <input type="text" name="title" defaultValue={post.title}/>
                    </label>
                  </p>
                  <p>
                      <label htmlFor=""> Post Slug: {" "} {errors?.slug && <em>Slug is required</em>} 
                      <input defaultValue={post.slug} id="slugInput" type="text" name="slug"/>
                  </label>
                  </p>
                  <p>
                      <label htmlFor="markdown">Markdown:</label>{" "} {errors?.markdown && <em>Markdown is required</em>} 
                      <br />
                      <textarea defaultValue={post.markdown} name="markdown" id="" rows={20} cols={30}/>
                  </p>
                  <p>
                      <button type="submit">{transition.submission ? "Updating..." : "Update Post"}</button>
                  </p>
            </Form>
        )
}