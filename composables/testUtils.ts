export const useTestUtils = () => {
    const test = useState("test", () => [])
    return {
        test,
    }
}