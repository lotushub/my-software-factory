# my-software-factory

This repository is set up to help you create a new **public** GitHub repository named `my-software-factory`, clone it, and initialize it on your local machine.

## Option 1: Using GitHub CLI (recommended)

```bash
# 1) Authenticate GitHub CLI (if needed)
gh auth login

# 2) Create a new public repository and clone it in the current directory
gh repo create my-software-factory --public --clone

# 3) Enter the repository directory
cd my-software-factory
```

## Option 2: Using GitHub Web + Git

1. Go to https://github.com/new
2. Repository name: `my-software-factory`
3. Visibility: **Public**
4. Click **Create repository**
5. Clone it locally:

```bash
git clone https://github.com/<your-username>/my-software-factory.git
cd my-software-factory
```

## Initial local setup (optional)

```bash
git checkout -b main
echo "# my-software-factory" > README.md
git add README.md
git commit -m "Initial commit"
git push -u origin main
```
