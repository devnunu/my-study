#include <stdio.h>
#include <stdlib.h>

typedef struct _node
{
    int value;
    struct _node *left;
    struct _node *right;
} node;

void insertNode(node *Tree, int data)
{
    node *current = Tree;
    node *parent = NULL;
    node *t = (node *)malloc(sizeof(node));

    while (current != NULL)
    {
        if (data == current->value)
        {
            current->value = data;
            return;
        }
        if (data > current->value)
        {
            parent = current;
            current = current->right;
        }
        else
        {
            parent = current;
            current = current->left;
        }
    }

    t->value = data;
    t->left = NULL;
    t->right = NULL;

    if (parent->value > t->value)
    {
        parent->left = t;
    }
    else
    {
        parent->right = t;
    }

    return;
}

void deleteNode(int data)
{
}

node* searchNode(node *Tree, int data)
{
    node *current = Tree;
    while (current != NULL)
    {
        if (current->value == data)
        {
            printf("%d\n", data);
            return current;
        }
        else if (current->value > data)
        {
            current =  current->left;
        }
        else
        {
            current =  current->right;
        }
    }
    printf("-1\n");
    return NULL;
}

void inorder(node *root)
{
    if (root == NULL)
    {
        return;
    }

    inorder(root->left);
    printf("%d ", root->value);
    inorder(root->right);
}

int main()
{
    node *Tree = (node *)malloc(sizeof(node));
    Tree->value = 0;
    Tree->left = NULL;
    Tree->right = NULL;

    insertNode(Tree, 1);
    insertNode(Tree, 10);
    insertNode(Tree, 8);
    insertNode(Tree, 12);
    insertNode(Tree, 7);
    insertNode(Tree, 6);

    searchNode(Tree, 6);
    searchNode(Tree, 7);
    searchNode(Tree, 5);

    inorder(Tree);
    printf("\n");

    return 0;
}