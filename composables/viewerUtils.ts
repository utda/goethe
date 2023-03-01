export const useViewerUtils = () => {
    const options = useState("options", () => [])
    const regions = useState("regions", () => [])
    const componentMap = useState("componentMap", () => {})
    const routes = useState("routes", () => {})
    const mainHeight = useState("mainHeight", () => 0)
    const url = useState("url", () => "")
    const theme = useState("theme", () => "dark")
    const sys_font_size = useState("sys_font_size", () => 100)
    const gaiji = useState("gaiji", () => "img")
    const manifest = useState("manifest", () => "")
    const canvases = useState("canvases", () => [])
    const image_canvas_id = useState("image_canvas_id", () => "")
    const showKaeri = useState("showKaeri", () => true)
    const showRuby = useState("showRuby", () => true)
    const itaiji = useState("itaiji", () => "default")
    const showPunctuation = useState("showPunctuation", () => true)
    const collection = useState("collection", () => [])
    const sys_page = useState("sys_page", () => 1)
    const image_selected = useState("image_selected", () => "")
    const image_show_all = useState("image_show_all", () => false)
    const hover_id = useState("hover_id", () => false)

    const menu_open = useState("menu_open", () => false)
    const menu_tab = useState("menu_tab", () => "info")
    const menu_default_size = useState("menu_default_size", () => 30)
    const menu_size = useState("menu_size", () => 0)
    const sys_theme = useState("sys_theme", () => "dark")

    const pane_options = useState("pane_options", () => [])
    const pane_layout = useState("pane_layout", () => [])

    const private_sys_show_page = useState("private_sys_show_page", () => false)

    const image_tab = useState("image_tab", () => "pb")

    const private_image_zone_canvas_map = useState("private_image_zone_canvas_map", () => {})
    const private_image_annotations_map = useState("private_image_annotations_map", () => {})
    const private_image_annotations_dict = useState("private_image_annotations_dict", () => {})

    const text_mode = useState("text_mode", () => "normal")

    const text_anchor = useState("text_anchor", () => true)

    const text_annotation = useState("text_annotation", () => true)

    const text_anchor_id = useState("text_anchor_id", () => "")

    const text_choice = useState("text_choice", () => true)
    const text_entity = useState("text_entity", () => true)

    return {
        options,
        regions,
        componentMap,
        routes,
        mainHeight,
        url,
        theme,
        sys_font_size,
        gaiji,
        manifest,
        canvases,
        image_canvas_id,
        showKaeri,
        showRuby,
        itaiji,
        showPunctuation,
        collection,
        sys_page,
        image_selected,
        image_show_all,
        hover_id,
       // params
       menu_open,
       menu_tab,
       menu_default_size,
       menu_size,
       sys_theme,

       pane_layout,
       pane_options,

       private_sys_show_page,

       image_tab,
       private_image_zone_canvas_map,
       private_image_annotations_map,

       private_image_annotations_dict,

       text_mode,

       text_anchor,

       text_annotation,

       text_anchor_id,

       text_choice,
       text_entity
    }
}