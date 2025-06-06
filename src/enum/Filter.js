export default function constructFilter(input_type,
    key,
    op,
    op_starts_with,
    op_ends_with,
    value,
    op_attr,
    placeholder) {
    return {
        input_type,
        key,
        op,
        op_starts_with,
        op_ends_with,
        value,
        op_attr,
        placeholder
    }
}
