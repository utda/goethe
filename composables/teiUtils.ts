export const useTeiUtils = () => {
    const tei_xml = useState("tei_xml", () => "")
    return {
        tei_xml,
    }
}