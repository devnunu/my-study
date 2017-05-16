#include<stdio.h>
#include<stdlib.h>

typedef struct _list {
    struct _node* head;
    struct _node* tail;
} list;

typedef struct _node {
    int data;
    struct _node *next;
} node;

void insertNode(list* L, int data){
    node *newNode =  (node*)malloc(sizeof(node));
    newNode->data = data;
    newNode->next = NULL;

    // 첫 노드를 만들었을 경우
    if(L->head==NULL&&L->tail==NULL){
        L->head =  L->tail = newNode;
    }
    // 노드를 추가할 경우
    else{
        L->tail->next = newNode;
        L->tail = newNode;
    }
}

void deleteLastNode(list* L){
    node *temp = L->head;
    while(temp->next->next!=NULL){
        temp = temp->next;
    }
    temp->next = temp->next->next;
    L->tail = temp;
}

void printList(list* L){
    node *temp = L->head;
    while(temp->next!=NULL){
        printf("%d\n", temp->data);
        temp = temp->next;
    }
}

int main(){
    list *newList = (list*)malloc(sizeof(list));
    newList->head = NULL;
    newList->tail = NULL;

    insertNode(newList, 1);
    insertNode(newList, 2);
    insertNode(newList, 3);
    insertNode(newList, 4);
    insertNode(newList, 5);
    insertNode(newList, 6);

    deleteLastNode(newList);

    printList(newList);
}