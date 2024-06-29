import json

def read_json_file(file_path):
    """Reads a JSON file and returns its content."""
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"File {file_path} not found.")
        return None

def extract_dependencies(package_json):
    """Extracts dependencies from package.json."""
    if package_json is None:
        return []
    dependencies = []
    for dep_key in ['dependencies', 'devDependencies']:
        if dep_key in package_json:
            dependencies.extend(list(package_json[dep_key].keys()))
    return dependencies

def generate_dependency_list(dependencies):
    """Formats the dependency names."""
    formatted_deps = []
    for dep in dependencies:
        parts = dep.split('/')
        if len(parts) > 1:
            formatted_deps.append("@{}/{}".format(parts[0], parts[1]))
        else:
            formatted_deps.append(dep)
    return formatted_deps

def main():
    # Paths to package-lock.json and package.json
    lock_file_path = 'package-lock.json'
    package_file_path = 'package.json'

    # Read package.json
    package_json = read_json_file(package_file_path)
    dependencies = extract_dependencies(package_json)

    # Generate and print the list of libraries
    library_list = generate_dependency_list(dependencies)
    print(library_list)

main()
