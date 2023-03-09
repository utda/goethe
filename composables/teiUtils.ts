export const useTeiUtils = () => {
    const tei_xml = useState("tei_xml", () => "")
    const options: any = useState("options", () => {})
    return {
        tei_xml,
        options
    }
}